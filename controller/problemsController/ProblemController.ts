import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProblem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, input, output, explanation } = req.body;
    console.log(req.body);
    if (!title || !description || !input || !output || !explanation) {
      res.status(400).json({ success: false, msg: "required all field!" });
      return;
    }
    const newProblem = await prisma.problem.create({
      data: {
        title: title,
        description: description,
        sampleInput: input,
        sampleOutput: output,
        sampleExplanation: explanation,
      },
    });
    res.status(201).json({ success: true, newProblem });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

export const getProblems = async (req: Request, res: Response): Promise<void> => {
  try {
    const problems = await prisma.problem.findMany({
      include: { submissions: true },
    });
    res.status(200).json({ success: true, problems: problems });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: "internal server error" });
  }
};

export const getProblem = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;

  const problem = await prisma.problem.findUnique({
    where: { id: id },
    include: { _count: true, submissions: { include: { user: true } } },
  });
  res.status(200).json({ success: true, problem });
};

export const deletProblem = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await prisma.problem.delete({
      where: { id: id },
    });
    res.status(200).json({ success: true, msg: "deleted successfull", deleted_problem: response });
  } catch (err) {
    console.log(err);
    res.status(204).json({ success: true, msg: "internal server error" });
  }
};

export const UpdateProblem = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const _updated = await prisma.problem.update({
      data,
      where: { id },
    });
    res.status(200).json({ success: true, msg: "updated", _updated });
  } catch (err) {
    console.log(err);
    res.status(204).json({ success: false });
  }
};

