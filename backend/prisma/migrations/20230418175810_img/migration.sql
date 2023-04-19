/*
  Warnings:

  - You are about to drop the column `images` on the `User` table. All the data in the column will be lost.
  - Added the required column `img` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "images",
ADD COLUMN     "img" TEXT NOT NULL;
