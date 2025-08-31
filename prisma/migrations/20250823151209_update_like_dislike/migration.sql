/*
  Warnings:

  - You are about to drop the column `dislike` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `Answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Answer" DROP COLUMN "dislike",
DROP COLUMN "like",
ADD COLUMN     "dislikeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0;
