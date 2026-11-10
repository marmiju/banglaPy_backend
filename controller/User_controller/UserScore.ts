import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prism = new PrismaClient();

export const UserScore = async (req: Request<{ userId: string }>, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const score = await prism.userScore.findUnique({
      where: {
        userId,
      },
    });
    res.status(200).json(score);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error!");
  }
};

