import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getResources = async (req: Request, res: Response): Promise<void> => {
  try {
    const resources = await prisma.learningResource.findMany({
      include: { quizs: true },
      orderBy: { id: "asc" },
    });
    res.status(200).json(resources);
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ msg: "internal server error" });
  }
};

