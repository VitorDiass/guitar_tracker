/*
  Warnings:

  - Changed the type of `first_name` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "first_name",
ADD COLUMN     "first_name" BOOLEAN NOT NULL;
