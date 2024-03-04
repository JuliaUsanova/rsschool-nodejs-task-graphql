import { GraphQLSchema } from "graphql";

export new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
}) as GraphQLSchema;