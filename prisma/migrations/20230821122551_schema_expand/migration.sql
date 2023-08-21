-- CreateEnum
CREATE TYPE "EpisodeStatus" AS ENUM ('UPCOMING', 'AIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CharacterStatus" AS ENUM ('ALIVE', 'DEAD', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "CharacterSpecie" AS ENUM ('HUMAN', 'VILTRUMITES', 'FLAXANS', 'SEQUIDS', 'UNOPIANS', 'MARTIANS', 'REANIMEN', 'CYBORG', 'ALIEN', 'KRYPTONIAN', 'SAPIEN', 'DAEMONITE', 'SIMIAN', 'ANTI_MATTER', 'MOLLUSK', 'DRAGON', 'LILLIPUTIAN', 'THERIAN', 'ZEPHYRIAN', 'FLORA', 'GALFIAN', 'COLONIAL', 'TALOXIAN', 'THRESHAN', 'XANREAN', 'VILTRUMITE_HUMAN');

-- CreateTable
CREATE TABLE "Invincible" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "airDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "image" TEXT,
    "synopsis" TEXT,
    "premise" TEXT,
    "creators" TEXT[],
    "writers" TEXT[],
    "artists" TEXT[],
    "network" TEXT,
    "distributor" TEXT,
    "status" TEXT,
    "genre" TEXT[],
    "basedOn" TEXT,
    "executiveProducer" TEXT[],
    "country" TEXT,

    CONSTRAINT "Invincible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "season" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "airDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "image" TEXT,
    "invincibleId" INTEGER,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "airDate" TIMESTAMP(3),
    "image" TEXT,
    "status" "EpisodeStatus" NOT NULL,
    "duration" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "synopsis" TEXT,
    "directors" TEXT[],
    "writers" TEXT[],

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "CharacterStatus",
    "bio" TEXT,
    "voiceBy" TEXT[],
    "image" TEXT,
    "occupation" TEXT[],
    "specie" "CharacterSpecie"[],
    "home" TEXT[],
    "placeOfBirth" TEXT,
    "alias" TEXT,
    "gender" TEXT,
    "affiliations" TEXT[],
    "maritalStatus" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToEpisode" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToEnemies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToAllies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Episode_title_key" ON "Episode"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToEpisode_AB_unique" ON "_CharacterToEpisode"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToEpisode_B_index" ON "_CharacterToEpisode"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToEnemies_AB_unique" ON "_CharacterToEnemies"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToEnemies_B_index" ON "_CharacterToEnemies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToAllies_AB_unique" ON "_CharacterToAllies"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToAllies_B_index" ON "_CharacterToAllies"("B");

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_invincibleId_fkey" FOREIGN KEY ("invincibleId") REFERENCES "Invincible"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToEpisode" ADD CONSTRAINT "_CharacterToEpisode_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToEpisode" ADD CONSTRAINT "_CharacterToEpisode_B_fkey" FOREIGN KEY ("B") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToEnemies" ADD CONSTRAINT "_CharacterToEnemies_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToEnemies" ADD CONSTRAINT "_CharacterToEnemies_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToAllies" ADD CONSTRAINT "_CharacterToAllies_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToAllies" ADD CONSTRAINT "_CharacterToAllies_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
