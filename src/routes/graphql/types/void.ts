import { GraphQLScalarType } from 'graphql';

export const Void = new GraphQLScalarType({
  name: 'Void',
  parseLiteral: () => null,
  parseValue: () => null,
  serialize: () => null,
})