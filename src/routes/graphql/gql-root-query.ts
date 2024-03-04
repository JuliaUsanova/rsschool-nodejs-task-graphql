import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserType } from './types/user.js';
import { UUIDType } from './types/uuid.js';
import { prismaClient } from './prisma-client.js';
import { MemberType, Post, Profile, User } from '@prisma/client';
import { PostType } from './types/post.js';
import { MemberTypeId, UserMemberType } from './types/member.js';
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
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: Post) => {
        try {
          return await prismaClient.post.findFirst({ where: { id } });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_) => {
        try {
          return await prismaClient.post.findMany();
        } catch (e) {
          console.error(e);
          return [];
        }
      },
    },

    memberType: {
      type: UserMemberType,
      args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
      resolve: async (_, { id }: MemberType) => {
        try {
          return await prismaClient.memberType.findFirst({ where: { id } });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },

    memberTypes: {
      type: new GraphQLList(UserMemberType),
      resolve: async () => {
        try {
          return await prismaClient.memberType.findMany();
        } catch (e) {
          console.error(e);
          return [];
        }
      },
    },

    profile: {
      type: UserProfileType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, { id }: Profile) => {
        try {
          return await prismaClient.profile.findFirst({ where: { id } });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },

    profiles: {
        type: new GraphQLList(UserProfileType),
        resolve: async () => {
            try {
                return await prismaClient.profile.findMany();
            } catch (e) {
                console.error(e);
                return [];
            }
        }
    }
  },
});
