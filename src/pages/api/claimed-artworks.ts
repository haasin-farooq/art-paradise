import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { User } from "@/utils/types";

const filePath = path.join(process.cwd(), "src/data/users.json");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const jsonData = await fs.promises.readFile(filePath, "utf8");
      const users: User[] = JSON.parse(jsonData);

      const claimedArtworkIds = users
        .flatMap((user) => user.art_works_claimed)
        .map((artwork) => artwork.id)
        .filter((artId, index, arr) => arr.indexOf(artId) === index);

      res.status(200).json(claimedArtworkIds);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
