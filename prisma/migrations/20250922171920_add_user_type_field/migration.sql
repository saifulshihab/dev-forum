-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('DEVELOPER', 'RECRUITER');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "type" "public"."UserType";
