/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserScore` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserScore_userId_key" ON "UserScore"("userId");
