import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getActivities = async (
  req: Request<{ userId: string }>,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  try {
    const activities = await prisma.activity.findMany({
      where: {
        userId,
      },
    });
    res.status(200).json(activities);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
};

