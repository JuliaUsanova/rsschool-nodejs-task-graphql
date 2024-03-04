import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { Profile } from '@prisma/client';
import { UserType } from './user.js';
import { prismaClient } from '../prisma-client.js';
import { UserMemberType } from './member.js';

export const UserProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(UUIDType) },
    user: {
        type: UserType,
        resolve: async (profile: Profile) => {
            try {
                return await prismaClient.user.findFirst({where: {id: profile.userId}})
            } catch (e) {
                console.error(e);
                return null;
            }
        }
    },
    memberType: {
        type: UserMemberType,
        resolve: async (profile: Profile) => {
            try {
                return await prismaClient.memberType.findFirst({where: {id: profile.memberTypeId}})
            } catch (e) {
                console.error(e);
                return null;
            }
        }
    }
  },
});
