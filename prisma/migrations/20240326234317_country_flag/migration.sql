/*
  Warnings:

  - Added the required column `countryFlag` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tour" ADD COLUMN     "countryFlag" TEXT NOT NULL;
