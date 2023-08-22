import { GraphQLResolveInfo } from "graphql";
import {
  getCharacter,
  getCharacters,
  createCharacter,
  deleteCharacter,
  updateCharacter,
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

    async deleteCharacter(_: any, args: Record<string, any>) {
      return await deleteCharacter(args.id);
    },

    async updateCharacter(_: any, args: Record<string, any>) {
      return await updateCharacter(args.id, args.input);
    },
  },
};
