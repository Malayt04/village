/*
  Warnings:

  - You are about to drop the `Avatar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Element` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Map` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MapElements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Space` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MapElements" DROP CONSTRAINT "MapElements_elementId_fkey";

-- DropForeignKey
ALTER TABLE "MapElements" DROP CONSTRAINT "MapElements_mapId_fkey";

-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_avatarId_fkey";

-- DropForeignKey
ALTER TABLE "spaceElements" DROP CONSTRAINT "spaceElements_elementId_fkey";

-- DropForeignKey
ALTER TABLE "spaceElements" DROP CONSTRAINT "spaceElements_spaceId_fkey";

-- DropTable
DROP TABLE "Avatar";

-- DropTable
DROP TABLE "Element";

-- DropTable
DROP TABLE "Map";

-- DropTable
DROP TABLE "MapElements";

-- DropTable
DROP TABLE "Space";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarId" TEXT,
    "role" "Role" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "space" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "thumbnail" TEXT,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "element" (
    "id" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "static" BOOLEAN NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "element_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "map" (
    "id" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mapElements" (
    "id" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "elementId" TEXT NOT NULL,
    "x" INTEGER,
    "y" INTEGER,

    CONSTRAINT "mapElements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatar" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT,
    "name" TEXT,

    CONSTRAINT "avatar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "space_id_key" ON "space"("id");

-- CreateIndex
CREATE UNIQUE INDEX "element_id_key" ON "element"("id");

-- CreateIndex
CREATE UNIQUE INDEX "map_id_key" ON "map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "mapElements_id_key" ON "mapElements"("id");

-- CreateIndex
CREATE UNIQUE INDEX "avatar_id_key" ON "avatar"("id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "avatar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space" ADD CONSTRAINT "space_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spaceElements" ADD CONSTRAINT "spaceElements_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spaceElements" ADD CONSTRAINT "spaceElements_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "element"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mapElements" ADD CONSTRAINT "mapElements_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mapElements" ADD CONSTRAINT "mapElements_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "element"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
