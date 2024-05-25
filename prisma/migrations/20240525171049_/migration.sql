-- AlterTable
ALTER TABLE "pointRecords" ALTER COLUMN "createdAt" SET DEFAULT NOW(),
ALTER COLUMN "workedHours" SET DATA TYPE TEXT;
