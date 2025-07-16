-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questions" JSONB NOT NULL,
    "prediction" TEXT,
    "isCorrect" BOOLEAN,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
