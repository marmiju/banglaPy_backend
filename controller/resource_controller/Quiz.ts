import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export const Create_Quiz = async (req: Request, res: Response): Promise<void> => {
  const data = req.body;

  try {
    const newResource = await Prisma.quiz.create({
      data,
    });
    res.status(200).json({ newResource });
  } catch (error) {
    console.error("Error creating resource:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

