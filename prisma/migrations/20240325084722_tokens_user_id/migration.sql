/*
  Warnings:

  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clerkId` on the `Token` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" DROP CONSTRAINT "Token_pkey",
DROP COLUMN "clerkId",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Token_pkey" PRIMARY KEY ("userId");
