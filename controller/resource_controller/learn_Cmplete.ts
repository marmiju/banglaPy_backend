import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { handleBadges } from "./handleBadge";
import { activity } from "../activityController/Activity";

const prisma = new PrismaClient();

/*
 FLOW:
 1. Check if user already completed
 2. Store learned progress
 3. Update user score
 4. Check & award badges
*/

export const LearnComplete = async (req: Request, res: Response): Promise<void> => {
  try {
    const { resId } = req.body as { resId?: number }; // single resource ID
    const user = req.user!; // comes from auth middleware

    if (!resId) {
      res.status(400).json({ msg: "resId is required" });
      return;
    }

    console.log("User:", user.id, "Resource:", resId);

    // activity
    const activities = await activity(user.id);

    // 1️⃣ --- CHECK IF ALREADY COMPLETED ---
    const existLearned = await prisma.learned.findFirst({
      where: { resId, userId: user.id },
    });

    if (existLearned) {
      res.status(200).json({ msg: "Already completed" });
      return;
    }

    // 2️⃣ --- CREATE NEW LEARNED ROW ---
    const newLearn = await prisma.learned.create({
      data: {
        resId,
        userId: user.id,
      },
    });

    console.log("Learned Created:", newLearn);

    // 3️⃣ --- UPDATE SCORE ---
    // Add +5 points for completing a lesson (you can change)

    const POINT = 5;

    const updatedScore = await prisma.userScore.upsert({
      where: {
        userId: user.id,
      },
      update: {
        totalScore: { increment: POINT },
        solvedCount: { increment: 1 },
      },
      create: {
        userId: user.id,
        totalScore: POINT,
        solvedCount: 1,
      },
    });

    console.log("Score Updated:", updatedScore);

    // 4️⃣ --- BADGE SYSTEM ---
    const badges = await handleBadges(user.id);
    console.log(badges);

    res.status(200).json({
      msg: "Learning complete",
      activities,
      lesson: newLearn,
      score: updatedScore,
      newBadges: badges,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error", error });
  }
};

