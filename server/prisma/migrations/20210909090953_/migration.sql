/*
  Warnings:

  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "last_name" TEXT NOT NULL,
ALTER COLUMN "first_name" DROP DEFAULT,
ALTER COLUMN "first_name" SET DATA TYPE TEXT;
