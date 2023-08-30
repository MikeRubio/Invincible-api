import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { typeDefs, resolvers } from "./graphql";
import charactersRouter from "./routes/characters";
import characterRouter from "./routes/character";

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

  app.use("/.netlify/functions/images", express.static("public"));
  app.use(
    "/.netlify/functions/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        url: `${req.protocol}://${req.get("host")}`,
      }),
    })
  );
  app.use("/.netlify/functions/characters", charactersRouter);
  app.use("/.netlify/functions/character", characterRouter);

  app.listen(port, () => {
    console.log(`🚀 Express running at: http://localhost:${port}`);
    console.log(`🚀 Graphql running at: http://localhost:${port}/graphql`);
  });
};

bootstrapServer();
export const handler = serverless(app);
