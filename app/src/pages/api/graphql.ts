import { ApolloServer } from "apollo-server-micro";
import { loadTypedefsSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { NextApiRequest, NextApiResponse } from "next";
import { DocumentNode } from "graphql";
import { Resolvers } from "api/codegen/resolvers-types";

import getBusinessesByUserId from "./business/resolvers/queries/getBusinessesByUserId";
import createBusiness from "./business/resolvers/mutations/createBusiness";

const schemas = loadTypedefsSync(`./src/pages/api/business/schema.graphql`, {
  loaders: [new GraphQLFileLoader()],
});

const typeDefs = schemas.map((schema) => schema.document) as DocumentNode[];

const resolvers: Resolvers = {
  Query: {
    getBusinessesByUserId,
  },
  Mutation: {
    createBusiness,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apolloServer = new ApolloServer({ typeDefs, resolvers, context: { req } });
  const startServer = apolloServer.start();

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.end();

    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);

  return null;
}

export const config = {
  api: {
    bodyParser: false,
  },
};
