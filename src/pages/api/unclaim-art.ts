import type { NextApiRequest, NextApiResponse } from "next";

import { APIResponse, User } from "@/utils/types";

import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/users.json");

export default async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) => {
  if (req.method === "PUT") {
    try {
      const { username, artId } = req.body;

      const jsonData = await fs.promises.readFile(filePath, "utf8");
      const users: User[] = JSON.parse(jsonData);

      const userIndex = users.findIndex((u) => u.username === username);

      if (userIndex !== -1) {
        const artIndex = users[userIndex].art_works_claimed.findIndex(
          (art) => art.id === artId,
        );

        if (artIndex !== -1) {
          users[userIndex].art_works_claimed.splice(artIndex, 1);
          await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2));
          const { password, ...userData } = users[userIndex];
          return res.status(200).json({
            data: [userData],
            message: "Art piece unclaimed successfully",
          });
        } else {
          return res
            .status(400)
            .json({ data: [], message: "Art piece not found" });
        }
      } else {
        return res.status(404).json({ data: [], message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ data: [], message: "Server error" });
    }
  } else {
    return res.status(405).json({ data: [], message: "Method not allowed" });
  }
};
