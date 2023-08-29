import { GraphQLResolveInfo } from "graphql";
import { CharacterStatus, CharacterGender } from "../enums/app_enums";

export interface GetCharactersArgs {
  info: GraphQLResolveInfo;
  status?: CharacterStatus;
  gender?: CharacterGender;
}

export interface GetCharactersByIdArgs {
  info: GraphQLResolveInfo;
  characterIds: number[];
}

export interface GetEpisodesArgs {
  info: GraphQLResolveInfo;
}

export interface GetCharacterArgs extends GetCharactersArgs {
  id?: number;
  alias?: string;
}

export interface GetEpisodeArgs extends GetEpisodesArgs {
  id: number;
}

export interface CreateCharacterArgs {
  name: string;
  status?: CharacterStatus;
  bio?: string;
  voiceBy?: string[];
  image: string[];
  occupation?: string[];
  specie: string;
  home: string[];
  placeOfBirth?: string;
  alias?: string;
  gender?: CharacterGender;
  affiliations?: string[];
  martialStatus?: string;
  placeOfDeath?: string;
  causeOfDeath?: string;
  maritalStatus?: string;
}

export interface UpdateCharacterArgs {
  name?: string;
  status?: CharacterStatus;
  bio?: string;
  voiceBy?: string[];
  image?: string[];
  occupation?: string[];
  specie?: string;
  home?: string[];
  placeOfBirth?: string;
  alias?: string;
  gender?: CharacterGender;
  affiliation?: string[];
  placeOfDeath?: string;
  causeOfDeath?: string;
  maritalStatus?: string;
}
