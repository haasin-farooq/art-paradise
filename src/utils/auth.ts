import { User } from "@/utils/types";

/**
 * Perform a login request to the API.
 * @param user - The user credentials.
 * @returns A promise that resolves to the fetch response.
 */
export const loginUser = async (user: User): Promise<Response> => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      email: user.email,
      password: user.password,
    }),
  });

  return res;
};
