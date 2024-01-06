import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import path from "path";
import { User } from "@/utils/types";

const filePath = path.join(process.cwd(), "src/data/users.json");

export default async (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.method === "GET") {
    const jsonData = await fs.promises.readFile(filePath, "utf8");
    const objectData = JSON.parse(jsonData);
    res.status(200).json(objectData);
  }
};
