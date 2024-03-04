import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserType } from './types/user.js';
import { UUIDType } from './types/uuid.js';
import { prismaClient } from './prisma-client.js';
import { MemberType, Post, Profile, User } from '@prisma/client';
import { PostType } from './types/post.js';
import { UserMemberType } from './types/member.js';
import { UserProfileType } from './types/profile.js';

export const rootQuery = new GraphQLObjectType({
  name: 'Query',

  fields: {
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: User) => {
        try {
          return await prismaClient.user.findFirst({ where: { id } });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_) => {
        try {
          return await prismaClient.user.findMany();
        } catch (e) {
          console.error(e);
          return [];
        }
      },
    },

    post: {
      type: PostType,
      resolve: async (_, { id }: Post) => {
        try {
          return await prismaClient.post.findFirst({ where: { id } });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },

    memberType: {
      type: UserMemberType,
      resolve: async (_, { id }: MemberType) => {
        try {
          return await prismaClient.memberType.findFirst({ where: { id } });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },

    profile: {
      type: UserProfileType,
      resolve: async (_, { id }: Profile) => {
        try {
          return await prismaClient.profile.findFirst({ where: { id } });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },
  },
});
