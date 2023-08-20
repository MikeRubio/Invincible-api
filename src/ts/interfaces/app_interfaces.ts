import { GraphQLResolveInfo } from "graphql";
import { CharacterStatus, CharacterSpecie } from "../enums/app_enums";

export interface GetCharactersArgs {
  info: GraphQLResolveInfo;
}

export interface GetCharacterArgs extends GetCharactersArgs {
  id: number;
}

export interface CreateCharacterArgs {
  name: string;
  status?: CharacterStatus;
  bio?: string;
  voiceBy?: string[];
  image?: string;
  specie: CharacterSpecie;
  occupation?: string[];
  home: string;
}
