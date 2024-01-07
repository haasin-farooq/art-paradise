import type { NextApiRequest, NextApiResponse } from "next";

import { APIResponse, User } from "@/utils/types";

import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/users.json");

export default async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) => {
  if (req.method === "GET") {
    try {
      const { username } = req.query;

      const jsonData = await fs.promises.readFile(filePath, "utf8");
      const users: User[] = JSON.parse(jsonData);

      const user = users.find((u) => u.username === username);

      if (user) {
        const { password, ...userData } = user;
        res.status(200).json({ data: [userData], message: "Success" });
      } else {
        res.status(404).json({ data: [], message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ data: [], message: "Server error" });
    }
  } else {
    res.status(405).json({ data: [], message: "Method not allowed" });
  }
};
