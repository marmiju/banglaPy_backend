/*
  Warnings:

  - The primary key for the `LearningResource` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `LearningResource` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `resource_id` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_resource_id_fkey";

-- AlterTable
ALTER TABLE "LearningResource" DROP CONSTRAINT "LearningResource_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "LearningResource_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "resource_id",
ADD COLUMN     "resource_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "LearningResource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
