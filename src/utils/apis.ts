import { Art, UserCredentials } from "@/utils/types";

/**
 * Perform a login request to the API.
 * @param credentials - The user credentials.
 * @returns A promise that resolves to the fetch response.
 */
export const loginUser = async (
  credentials: UserCredentials,
): Promise<Response> => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  return res;
};

/**
 * Fetch user data by username.
 * @param username - The username of the user to fetch.
 * @returns A promise that resolves to the fetch response.
 */
export const fetchUserData = async (username: string): Promise<Response> => {
  const res = await fetch(`/api/users/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};

/**
 * Claim an artwork for the user.
 * @param username - The username of the user.
 * @param art - The artwork to claim.
 * @returns A promise that resolves to the fetch response.
 */
export const claimArt = async (
  username: string,
  art: Art,
): Promise<Response> => {
  const res = await fetch("/api/claim-art", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      art,
    }),
  });

  return res;
};

/**
 * Unclaim a claimed artwork for the user.
 * @param username - The username of the user.
 * @param artId - The ID of the artwork to unclaim.
 * @returns A promise that resolves to the fetch response.
 */
export const unclaimArt = async (
  username: string,
  artId: number,
): Promise<Response> => {
  const res = await fetch("/api/unclaim-art", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      artId,
    }),
  });

  return res;
};

/**
 * Fetch IDs of artworks that are claimed by users.
 * @returns A promise that resolves to the fetch response.
 */
export const fetchClaimedArtworkIds = async (): Promise<Response> => {
  const res = await fetch("/api/claimed-artworks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};
