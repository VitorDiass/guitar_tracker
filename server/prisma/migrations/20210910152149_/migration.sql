-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "fromLesson" DROP NOT NULL,
ALTER COLUMN "links" DROP NOT NULL,
ALTER COLUMN "prog_melody" DROP NOT NULL,
ALTER COLUMN "prog_rhythm" DROP NOT NULL;
