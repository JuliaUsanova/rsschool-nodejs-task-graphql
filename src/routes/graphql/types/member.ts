import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql';
import { UserProfileType } from './profile.js';
import { MemberType } from '@prisma/client';
import { prismaClient } from '../prisma-client.js';

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: {
      value: 'basic',
    },
    business: {
      value: 'business',
    },
  },
});

export const UserMemberType: GraphQLObjectType<MemberType> = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: (GraphQLInt) },
    profiles: {
      type: new GraphQLList(UserProfileType),
      resolve: async (_, {id}: MemberType) => {
        try {
          return await prismaClient.profile.findMany({
            where: { memberTypeId: id },
          });
        } catch (e) {
          console.error(e);
          return [];
        }
      },
    },
  }),
});
