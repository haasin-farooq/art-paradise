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
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  errorMessage: string | null;
}

const MISSING_AUTH_CONTEXT_PROVIDER =
  "You forgot to wrap your app in <AuthProvider>";

const AuthContext = createContext<AuthContext>({
  get isLoggedIn(): never {
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loggedIn = !!localStorage.getItem("username");
    setIsLoggedIn(loggedIn);
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
        setIsLoggedIn(true);
        router.push("/dashboard");
      } else {
        console.error(data.message);
        setErrorMessage(data.message);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, login, logout, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
