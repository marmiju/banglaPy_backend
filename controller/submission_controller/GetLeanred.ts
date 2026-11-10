import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetLearned = async (req: Request<{ userId: string }>, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const learned = await prisma.learned.findMany({
      where: {
        userId,
      },
      include: {
        res: true,
      },
    });
    res.status(200).json(learned);
  } catch (err) {
    console.log(err);
    res.status(500).send("inernal server error!");
  }
};

