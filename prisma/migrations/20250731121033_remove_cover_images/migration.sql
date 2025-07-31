/*
  Warnings:

  - You are about to drop the column `image` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `cover` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dp` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cover",
DROP COLUMN "dp";
