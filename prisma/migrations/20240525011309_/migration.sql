-- CreateTable
CREATE TABLE "pointRecords" (
    "id" TEXT NOT NULL,
    "userCode" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
    "workedHours" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "pointRecords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pointRecords_userCode_key" ON "pointRecords"("userCode");
