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
      const { username, art } = req.body;

      const jsonData = await fs.promises.readFile(filePath, "utf8");
      const users: User[] = JSON.parse(jsonData);

      const user = users.find((u) => u.username === username);

      if (user) {
        if (!user.art_works_claimed.map((art) => art.id).includes(art.id)) {
          user.art_works_claimed.unshift(art);
          await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2));
          const { password, ...userData } = user;
          return res.status(200).json({
            data: [userData],
            message: "Art piece claimed successfully",
          });
        } else {
          return res.status(400).json({
            data: [],
            message: "Art piece already claimed",
          });
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
