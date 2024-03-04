import { GraphQLSchema } from "graphql";
import { rootQuery} from "./gql-root-query.js";
import { rootMutation } from "./gql-root-mutation.js";

export const gqlSchema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
});
