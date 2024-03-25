/*
  Warnings:

  - A unique constraint covering the columns `[userId,city,country]` on the table `Tour` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Tour_city_country_key";

-- CreateIndex
CREATE UNIQUE INDEX "Tour_userId_city_country_key" ON "Tour"("userId", "city", "country");
