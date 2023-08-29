import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { typeDefs, resolvers } from "../src/graphql";
import charactersRouter from "../src/routes/characters";
import characterRouter from "../src/routes/character";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const bootstrapServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/images", express.static("public"));
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        url: `${req.protocol}://${req.get("host")}`,
      }),
    })
  );
  app.use("/characters", charactersRouter);
  app.use("/character", characterRouter);

  app.listen(port, () => {
    console.log(`🚀 Express running at: http://localhost:${port}`);
    console.log(`🚀 Graphql running at: http://localhost:${port}/graphql`);
  });
};

bootstrapServer();
