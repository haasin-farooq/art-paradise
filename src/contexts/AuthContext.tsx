"use client";

import { loginUser } from "@/utils/auth";
import { User } from "@/utils/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  FC,
} from "react";

interface AuthContext {
  currentUser: string | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  errorMessage: string | null;
}

const MISSING_AUTH_CONTEXT_PROVIDER =
  "You forgot to wrap your app in <AuthProvider>";

const AuthContext = createContext<AuthContext>({
  get currentUser(): never {
    throw new Error(MISSING_AUTH_CONTEXT_PROVIDER);
  },
  get isLoading(): never {
    throw new Error(MISSING_AUTH_CONTEXT_PROVIDER);
  },
  get login(): never {
    throw new Error(MISSING_AUTH_CONTEXT_PROVIDER);
  },
  get logout(): never {
    throw new Error(MISSING_AUTH_CONTEXT_PROVIDER);
  },
  get errorMessage(): never {
    throw new Error(MISSING_AUTH_CONTEXT_PROVIDER);
  },
});

export const useAuth = () => useContext(AuthContext);

interface AuthContextProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setCurrentUser(username);
    setIsLoading(false);
  }, []);

  const login = async (user: User) => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await loginUser(user);
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("username", user.username);
        setCurrentUser(user.username);
        router.push("/dashboard");
      } else {
        console.error(data.message);
        setErrorMessage(data.message);
        setCurrentUser(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("username");
    setCurrentUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, login, logout, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
