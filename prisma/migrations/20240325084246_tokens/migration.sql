-- CreateTable
CREATE TABLE "Token" (
    "clerkId" TEXT NOT NULL,
    "tokens" INTEGER NOT NULL DEFAULT 2000,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("clerkId")
);
