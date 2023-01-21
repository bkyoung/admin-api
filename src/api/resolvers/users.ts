import { Resolvers } from '../lib/resolverTypes'
import { createUser, deleteUser, updateUser, listUserAccount, listUserGroups, listAllUserAccounts } from '../../lib/google'

export const userResolvers: Resolvers = {
  User: {
    groups: async (obj, _args, { auth }) => listUserGroups(auth, { id: obj.id }),
    additionalData: (obj) => obj['customSchemas']
  },
  Query: {
    user: async (_obj, { userKey }, { auth }) => listUserAccount(auth, userKey),
    users: async (_obj, _args, { auth }) => listAllUserAccounts(auth),
  },
  Mutation: {
    create: async (_obj, { user }, { auth }) => createUser(auth, user),
    delete: async (_obj, { userKey }, { auth }) => {
      try {
        deleteUser(auth, userKey);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    update: async (_obj, { userKey, userInfo }, { auth }) => updateUser(auth, userKey, userInfo),
  },
}

export default userResolvers
