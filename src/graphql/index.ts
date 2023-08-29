import { GraphQLScalarType, Kind } from "graphql";
import { readFileSync } from "fs";
import path from "path";
import { characterResolver } from "./resolvers/character.resolver";
import { episodeResolver } from "./resolvers/episode.resolver";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseValue(value) {
    if (typeof value === "number") {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error("GraphQL Date Scalar parser expected a `number`");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

const userTypes = readFileSync(
  path.join(__dirname, "./typeDefs/character.graphql"),
  {
    encoding: "utf-8",
  }
);

const episodeTypes = readFileSync(
  path.join(__dirname, "./typeDefs/episode.graphql"),
  {
    encoding: "utf-8",
  }
);

export const typeDefs = `
  ${userTypes}
  ${episodeTypes}
  `;

export const resolvers = {
  Character: {
    ...characterResolver.Character,
  },
  Query: {
    ...characterResolver.Query,
    ...episodeResolver.Query,
  },
  Mutation: {
    ...characterResolver.Mutation,
  },
  Date: dateScalar,
};
