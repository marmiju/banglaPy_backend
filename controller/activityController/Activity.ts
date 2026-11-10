import { PrismaClient, Activity } from "@prisma/client";

const prisma = new PrismaClient();

export const activity = async (userId: string): Promise<Activity> => {
  // activity
  const today = new Date();
  const dateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  console.log("today", dateOnly);

  const act = await prisma.activity.upsert({
    where: { userId_date: { userId, date: dateOnly } },
    update: { count: { increment: 1 } },
    create: { userId, date: dateOnly, count: 1 },
  });
  return act;
};

