/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `nhap123` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "nhap123" DROP COLUMN "isCompleted",
ADD COLUMN     "iscompleted" BOOLEAN NOT NULL DEFAULT false;
