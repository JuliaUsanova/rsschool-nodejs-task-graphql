import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { Profile } from '@prisma/client';
import { UserType } from './user.js';
import { prismaClient } from '../prisma-client.js';
import { MemberTypeId, UserMemberType } from './member.js';

export const UserProfileType: GraphQLObjectType<Profile> = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    user: {
      type: UserType,
      resolve: async (_, { userId }: Profile) => {
        try {
          return await prismaClient.user.findFirst({ where: { id: userId } });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },
    memberType: {
      type: UserMemberType,
      resolve: async (_, { memberTypeId }: Profile) => {
        try {
          return await prismaClient.memberType.findFirst({ where: { id: memberTypeId } });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },
  }),
});

export const UserProfileInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
  }),
});
