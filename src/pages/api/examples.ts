// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'ONLY POST REQUESTS ALLOWED' })
  }

  const { body } = req
  const { content, author, post } = JSON.parse(body)

  const createComment = await prisma.comment.create({
      data: { 
          content: content,
          author: author,
          post: {
              connect: { id: post }
          }
      }

      

  })
  res.status(200).json({createComment})
  console.log(createComment)




}

export default handler;