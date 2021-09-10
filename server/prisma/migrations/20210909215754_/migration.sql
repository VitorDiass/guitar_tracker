-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isLoggedIn" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Song" (
    "song_id" TEXT NOT NULL,
    "song_name" TEXT NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("song_id")
);
