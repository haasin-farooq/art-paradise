import type { NextApiRequest, NextApiResponse } from "next";

import { APIResponse, User } from "@/utils/types";

import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/users.json");

export default async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const jsonData = await fs.promises.readFile(filePath, "utf8");
      const users: User[] = JSON.parse(jsonData);

      const userIndex = users.findIndex((u) => u.email === email);
      const user = users[userIndex];

      const validUserCredentials = !!(
        userIndex !== -1 &&
        user.email === email &&
        user.password === password
      );

      if (validUserCredentials) {
        user.last_login_date = new Date().toISOString();
        await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2));
        const { password, ...userData } = user;
        res.status(200).json({ data: [userData], message: "Login successful" });
      } else {
        res.status(401).json({ data: [], message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ data: [], message: "Server error" });
    }
  } else {
    res.status(405).json({ data: [], message: "Method not allowed" });
  }
};
