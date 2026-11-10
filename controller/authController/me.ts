import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GETME = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
    });
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
};

