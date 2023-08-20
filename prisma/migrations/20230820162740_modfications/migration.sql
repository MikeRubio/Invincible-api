-- CreateEnum
CREATE TYPE "EpisodeStatus" AS ENUM ('UPCOMING', 'AIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CharacterStatus" AS ENUM ('ALIVE', 'DEAD', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "CharacterSpecie" AS ENUM ('HUMAN', 'Viltrumites', 'Flaxans', 'Sequids', 'Unopians', 'Martians');

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "season" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "airDate" TIMESTAMP(3),

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "airDate" TIMESTAMP(3),
    "image" TEXT NOT NULL,
    "status" "EpisodeStatus" NOT NULL,
    "duration" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "storyLine" TEXT,
    "directors" TEXT[],
    "writers" TEXT[],
    "guestStars" TEXT[],

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "CharacterStatus",
    "bio" TEXT,
    "voiceBy" TEXT[],
    "image" TEXT NOT NULL,
    "occupation" TEXT[],
    "specie" "CharacterSpecie" NOT NULL,
    "home" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToEpisode" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToEpisode_AB_unique" ON "_CharacterToEpisode"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToEpisode_B_index" ON "_CharacterToEpisode"("B");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToEpisode" ADD CONSTRAINT "_CharacterToEpisode_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToEpisode" ADD CONSTRAINT "_CharacterToEpisode_B_fkey" FOREIGN KEY ("B") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
