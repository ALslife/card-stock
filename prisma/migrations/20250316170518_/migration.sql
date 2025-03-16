/*
  Warnings:

  - Made the column `Block` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `No` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "Block" SET NOT NULL,
ALTER COLUMN "No" SET NOT NULL;
