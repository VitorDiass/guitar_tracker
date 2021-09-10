/*
  Warnings:

  - A unique constraint covering the columns `[song_name]` on the table `Song` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artist_name` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromLesson` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `links` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prog_melody` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prog_rhythm` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "artist_name" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fromLesson" BOOLEAN NOT NULL,
ADD COLUMN     "instrument_type" INTEGER,
ADD COLUMN     "links" TEXT NOT NULL,
ADD COLUMN     "prog_melody" INTEGER NOT NULL,
ADD COLUMN     "prog_rhythm" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Song_song_name_key" ON "Song"("song_name");
