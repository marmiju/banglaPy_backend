/*
  Warnings:

  - Added the required column `googleId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_picture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleId" TEXT NOT NULL,
ADD COLUMN     "profile_picture" TEXT NOT NULL;
