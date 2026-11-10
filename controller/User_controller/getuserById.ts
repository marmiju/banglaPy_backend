import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetUserById = async (
  req: Request<{ userId: string }>,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  res.status(200).json(user);
};

