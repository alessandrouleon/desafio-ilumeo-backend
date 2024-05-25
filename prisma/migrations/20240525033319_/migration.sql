-- AlterTable
ALTER TABLE "pointRecords" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "createdAt" SET DEFAULT NOW();
