/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `pointRecords` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `pointRecords` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "pointRecords_userCode_key";

-- AlterTable
ALTER TABLE "pointRecords" DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "createdAt" SET DEFAULT NOW();
