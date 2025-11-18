/*
  Warnings:

  - A unique constraint covering the columns `[resId,userId]` on the table `learned` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "learned_resId_userId_key" ON "learned"("resId", "userId");
