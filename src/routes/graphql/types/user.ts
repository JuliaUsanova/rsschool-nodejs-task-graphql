import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { UserProfileType } from './profile.js';
import { User } from '@prisma/client';
import { prismaClient } from '../prisma-client.js';
import { PostType } from './post.js';

export const UserType: GraphQLObjectType<User> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    profile: {
        type: UserProfileType,
        resolve: async (_, {id}: User) => {
            try {
                return await prismaClient.profile.findFirst({where: {userId: id}})
            } catch (e) {
                console.error(e);
                return null;
            }
        }
    },
    
    posts: {
        type: new GraphQLList(PostType),
        resolve: async (_, {id}: User) => {
            try {
                return await prismaClient.post.findMany({where: {authorId: id}})
            } catch (e) {
                console.error(e);
                return [];
            }
        }
    },

    userSubscribedTo: {
        type: new GraphQLList(UserType),
        resolve: async ({ id }: User) => {
          const results = await prismaClient.subscribersOnAuthors.findMany({
            where: { subscriberId: id },
            select: { author: true },
          });
  
          return results.map((result) => result.author);
        },
      },
  
      subscribedToUser: {
        type: new GraphQLList(UserType),
        resolve: async ({ id }: User) => {
          const results = await prismaClient.subscribersOnAuthors.findMany({
            where: { authorId: id },
            select: { subscriber: true },
          });
          return results.map((result) => result.subscriber);
        },
      },

  }),

});

export const UserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});

export const UserChangeType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});
