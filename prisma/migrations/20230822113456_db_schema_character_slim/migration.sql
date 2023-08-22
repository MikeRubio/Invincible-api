-- CreateEnum
CREATE TYPE "EpisodeStatus" AS ENUM ('UPCOMING', 'AIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CharacterStatus" AS ENUM ('ALIVE', 'DECEASED', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "CharacterGender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'UNKNOWN');

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "season" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "airDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "image" TEXT[] DEFAULT ARRAY['']::TEXT[],

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "airDate" TIMESTAMP(3),
    "image" TEXT[] DEFAULT ARRAY['']::TEXT[],
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
    "status" "CharacterStatus" DEFAULT 'ALIVE',
    "bio" TEXT,
    "voiceBy" TEXT[],
    "Age" TEXT DEFAULT '',
    "image" TEXT[] DEFAULT ARRAY['']::TEXT[],
    "occupation" TEXT[],
    "specie" TEXT DEFAULT 'Human',
    "home" TEXT[] DEFAULT ARRAY['Earth']::TEXT[],
    "placeOfBirth" TEXT DEFAULT 'Earth',
    "alias" TEXT,
    "gender" "CharacterGender" DEFAULT 'MALE',
    "affiliations" TEXT[],
    "placeOfDeath" TEXT DEFAULT '',
    "causeOfDeath" TEXT DEFAULT '',
    "maritalStatus" TEXT DEFAULT 'Single',

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToEpisode" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Episode_title_key" ON "Episode"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Character_alias_key" ON "Character"("alias");

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
