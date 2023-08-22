import { GraphQLResolveInfo } from "graphql";
import { getEpisode, getEpisodes } from "../services/episode.service";

export const episodeResolver = {
  Query: {
    async episodes(
      _: any,
      args: Record<string, any>,
      contex: any,
      info: GraphQLResolveInfo
    ) {
      return await getEpisodes({ info });
    },
    async episode(
      _: any,
      args: Record<string, any>,
      contex: any,
      info: GraphQLResolveInfo
    ) {
      return await getEpisode({ id: args.id, info });
    },
  },
};
