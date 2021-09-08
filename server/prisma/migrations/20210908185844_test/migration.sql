/*
  Warnings:

  - Changed the type of `last_name` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "last_name",
ADD COLUMN     "last_name" BOOLEAN NOT NULL;
