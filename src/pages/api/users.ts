import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import path from "path";
import { User } from "@/utils/types";

interface Response {
  data: Omit<User, "password">[];
  message: string;
}

const filePath = path.join(process.cwd(), "src/data/users.json");

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method === "GET") {
    const jsonData = await fs.promises.readFile(filePath, "utf8");
    const objectData = JSON.parse(jsonData);
    res.status(200).json(objectData);
  } else if (req.method === "POST") {
    try {
      const { username, email, password } = req.body;

      const jsonData = await fs.promises.readFile(filePath, "utf8");
      const users: User[] = JSON.parse(jsonData);

      const userIndex = users.findIndex((u) => u.username === username);

      const validUserCredentials = !!(
        userIndex !== -1 &&
        users[userIndex].email === email &&
        users[userIndex].password === password
      );

      if (validUserCredentials) {
        users[userIndex].last_login_date = new Date().toISOString();
        await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2));

        const { password, ...userData } = users[userIndex];
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
