import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetSubmission = async (
  req: Request<{ userId: string }>,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  try {
    const submission = await prisma.submission.findMany({
      where: {
        userId,
      },
      include: {
        problem: true,
      },
    });
    res.status(200).json(submission);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
};

export default GetSubmission;

