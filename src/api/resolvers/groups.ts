import { Resolvers } from '../lib/resolverTypes'
import {
  createGroup,
  deleteGroup,
  updateGroup,
  getGroup,
  listAllGroups,
  listGroupMembers,
  addUserToGroup as addUser,
  removeUserFromGroup as removeUser
} from '../../lib/google'

export const groupResolvers: Resolvers = {
  Group: {
    members: async ({ id }, _args, { auth }) => listGroupMembers(auth, { id }),
  },
  Query: {
    group: async (_obj, { groupKey }, { auth }) => getGroup(auth, groupKey),
    groups: async (_obj, _args, { auth }) => listAllGroups(auth),
  },
  Mutation: {
    addUserToGroup: async (_obj, { groupKey, member }, { auth }) => addUser(auth, member, groupKey),
    removeUserFromGroup: (_obj, { groupKey, memberKey }, { auth }) => removeUser(auth, memberKey, groupKey),
    createGroup: async (_obj, { group }, { auth }) => createGroup(auth, group),
    deleteGroup: async (_obj, { groupKey }, { auth }) => {
      try {
        deleteGroup(auth, groupKey);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    updateGroup: async (_obj, { groupKey, groupInfo }, { auth }) => updateGroup(auth, groupKey, groupInfo),
  },
}

export default groupResolvers
