import { GraphQLResolveInfo } from "graphql";
import {
  getCharacter,
  getCharacters,
  createCharacter,
} from "../services/character.service";

export const characterResolver = {
  Query: {
    async characters(
      _: any,
      args: Record<string, any>,
      contex: any,
      info: GraphQLResolveInfo
    ) {
      return await getCharacters({ info });
    },
    async character(
      _: any,
      args: Record<string, any>,
      contex: any,
      info: GraphQLResolveInfo
    ) {
      return await getCharacter({ id: args.id, info });
    },
  },
  Mutation: {
    async createCharacter(_: any, args: Record<string, any>) {
      return await createCharacter(args.input);
    },
  },
};
