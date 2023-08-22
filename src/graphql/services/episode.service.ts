import { PrismaClient } from "@prisma/client";
// import { extractSelections } from "../utils/extractSelections";
import {
  GetEpisodeArgs,
  GetEpisodesArgs,
} from "../../ts/interfaces/app_interfaces";

const prisma = new PrismaClient({
  log: ["query", "error"],
});

export const getEpisodes = async ({ info }: GetEpisodesArgs) => {
  // const extractedSelections = extractSelections(info);

  return await prisma.episode.findMany();
};

export const getEpisode = async ({ id, info }: GetEpisodeArgs) => {
  // const extractedSelections = extractSelections(info);

  return await prisma.episode.findUnique({ where: { id: Number(id) } });
};
