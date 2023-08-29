import { GraphQLResolveInfo } from "graphql";
import {
  getCharacter,
  getCharacterByAlias,
  getCharacters,
  getCharactersByStatus,
  getCharactersByGender,
  createCharacter,
  deleteCharacter,
  updateCharacter,
} from "../services/character.service";

export const characterResolver = {
  Character: {
    image: (parent: any, _: any, { url }: any) => {
      return parent.image.map(
        (imageName: string) => `${url}/images/${imageName}`
      );
    },
  },
  Query: {
    async characters(
      _: any,
      args: Record<string, any>,
      context: any,
      info: GraphQLResolveInfo
    ) {
      return await getCharacters({ info });
    },
    async charactersByStatus(
      _: any,
      args: Record<string, any>,
      context: any,
      info: GraphQLResolveInfo
    ) {
      return await getCharactersByStatus({ status: args.status, info });
    },
    async charactersByGender(
      _: any,
      args: Record<string, any>,
      context: any,
      info: GraphQLResolveInfo
    ) {
      return await getCharactersByGender({ gender: args.gender, info });
    },
    async character(
      _: any,
      args: Record<string, any>,
      context: any,
      info: GraphQLResolveInfo
    ) {
      return await getCharacter({ id: args.id, info });
    },
    async characterByAlias(
      _: any,
      args: Record<string, any>,
      context: any,
      info: GraphQLResolveInfo
    ) {
      return await getCharacterByAlias({ alias: args.alias, info });
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
