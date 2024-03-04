import { GraphQLObjectType } from 'graphql';
import { UserChangeType, UserInputType, UserType } from './types/user.js';
import { prismaClient } from './prisma-client.js';
import { Post, Profile, User } from '@prisma/client';
import { UserProfileChangeInputType, UserProfileInputType, UserProfileType } from './types/profile.js';
import { PostChangeInputType, PostInputType, PostType } from './types/post.js';
import { UUIDType } from './types/uuid.js';
import { Void } from './types/void.js';

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: { dto: { type: UserInputType } },
      resolve: async (_, { dto }: { dto: User }) => {
        try {
          return await prismaClient.user.create({
            data: dto,
          });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },

    changeUser: {
        type: UserType,
        args: {id: {type: UUIDType}, dto: {type: UserChangeType}},
        resolve: async (_, {id, dto}: {id: User['id'], dto: User}) => {
            try {
                return await prismaClient.user.update({where: {id}, data: dto});
            } catch (e) {
                console.error(e);
                return null;
            }
        }
    },

    deleteUser: {
      type: Void,
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }: User) => {
        try {
          await prismaClient.user.delete({ where: { id } });
          return null;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },

    createProfile: {
      type: UserProfileType,
      args: { dto: { type: UserProfileInputType } },
      resolve: async (_, { dto }: { dto: Profile }) => {
        try {
          return await prismaClient.profile.create({
            data: dto,
          });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },

    changeProfile: {
        type: UserProfileType,
        args: {id: {type: UUIDType}, dto: {type: UserProfileChangeInputType}},
        resolve: async (_, {id, dto}: {id: Profile['id'], dto: Profile}) => {
            try {
                return await prismaClient.profile.update({where: {id}, data: dto});
            } catch (e) {
                console.error(e);
                return null;
            }
        }
    },

    deleteProfile: {
      type: Void,
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }: Profile) => {
        try {
          await prismaClient.profile.delete({ where: { id } });
          return null;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },

    createPost: {
      type: PostType,
      args: { dto: { type: PostInputType } },
      resolve: async (_, { dto }: { dto: Post }) => {
        try {
          return await prismaClient.post.create({
            data: dto,
          });
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    },

    changePost: {
        type: PostType,
        args: {id: {type: UUIDType}, dto: {type: PostChangeInputType}},
        resolve: async (_, {id, dto}: {id: Post['id'], dto: Post}) => {
            try {
                return await prismaClient.post.update({where: {id}, data: dto});
            } catch (e) {
                console.error(e);
                return null;
            }
        }
    },

    deletePost: {
        type: Void,
        args: { id: { type: UUIDType } },
        resolve: async (_, { id }: Post) => {
            try {
                await prismaClient.post.delete({where: {id}});
                return null;
            } catch (e) {
                console.error(e);
                return null;
            }
        }
    }
  },
});
