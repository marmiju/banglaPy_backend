-- AddForeignKey
ALTER TABLE "learned" ADD CONSTRAINT "learned_resId_fkey" FOREIGN KEY ("resId") REFERENCES "LearningResource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
