// src/server/express.js
import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

import { pubsub } from "./pubsub.js"; // Import the pubsub instance
import jwt from "jsonwebtoken";

import { typeDefs } from "../schema/typeDefs.js";
import { resolvers } from "../schema/resolvers.js";

function getUserFromToken(authHeader) {
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1]; // remove "Bearer"
  if (!token) return null;
  try {
    const decoded = jwt.decode(token); // just decode for id
    return { id: decoded.id };
  } catch {
    return null;
  }
}
export async function createExpressServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Build executable schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Apollo Server setup
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();

  // Attach HTTP middleware
  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
     context: async ({ req }) => {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.split(" ")[1] || ""; // raw JWT
      const user = token ? { id: jwt.decode(token).id } : null; // minimal user info
      return { pubsub, user, token }; // send token too
    },
    })
  );

  // WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer(
    {
      schema,
      context: async (ctx, msg, args) => {
        const token = ctx.connectionParams?.authorization || "";
        const user = getUserFromToken(token);
        return { pubsub, user };
      },
    },
    wsServer
  );

  return httpServer;
}

export const createApolloServer = createExpressServer;