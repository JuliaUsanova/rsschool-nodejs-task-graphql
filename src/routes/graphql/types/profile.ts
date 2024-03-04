import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
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
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeId },
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
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeId },
  }),
});

export const UserProfileChangeInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    fields: () => ({
      isMale: { type: GraphQLBoolean },
      yearOfBirth: { type: GraphQLInt },
      userId: { type: UUIDType },
      memberTypeId: { type: MemberTypeId },
    }),
  });
