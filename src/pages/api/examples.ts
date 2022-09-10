// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const allPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const examples = await prisma.posts.findMany();
  res.status(200).json(examples);
  console.log(examples);
};

export default allPosts;
