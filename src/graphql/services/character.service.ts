import { PrismaClient } from "@prisma/client";
import { extractSelections } from "../utils/extractSelections";
import {
  GetCharactersArgs,
  GetCharacterArgs,
  CreateCharacterArgs,
} from "../../ts/interfaces/app_interfaces";

const prisma = new PrismaClient({
  log: ["query", "error"],
});

export const getCharacters = async ({ info }: GetCharactersArgs) => {
  const extractedSelections = extractSelections(info);
  const episodesIncluded = extractedSelections.includes("episodes");

  if (episodesIncluded) {
    return await prisma.character.findMany({ include: { episodes: true } });
  }

  return await prisma.character.findMany();
};

export const getCharacter = async ({ id, info }: GetCharacterArgs) => {
  const extractedSelections = extractSelections(info);
  const episodesIncluded = extractedSelections.includes("episodes");

  if (episodesIncluded) {
    return await prisma.character.findUnique({
      where: { id },
      include: { episodes: true },
    });
  }

  return await prisma.character.findUnique({ where: { id } });
};

export const createCharacter = async (input: CreateCharacterArgs) => {
  const createdUser = await prisma.character.create({
    data: {
      name: input.name,
      status: input.status,
      bio: input.bio,
      voiceBy: input.voiceBy,
      image: input.image || "",
      specie: input.specie,
      occupation: input.occupation,
      home: input.home,
    },
  });

  return createdUser;
};
