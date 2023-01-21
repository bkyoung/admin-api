import { GraphQLClient } from 'graphql-request';
import {
  GET_USER,
  CREATE_USER,
  DELETE_USER,
  LIST_USERS,
  SUSPEND_USER,
  UPDATE_USER,
  LIST_GROUPS,
} from './queries';

export const newUserClient = async (endpoint) => {
  const client = new GraphQLClient(endpoint);
  client.setHeader('accept', 'application/json');

  const performQuery = async (client, query, vars) => client.request(query, vars)

  return {
    getUser: async (key) => performQuery(client, GET_USER, { userKey: { key } }),
    createUser: async ({ email, givenName, familyName }) => performQuery(client, CREATE_USER, { email, givenName, familyName }),
    deleteUser: async (key) => performQuery(client, DELETE_USER, { userKey: { key } }),
    listUsers: async () => performQuery(client, LIST_USERS, {}),
    suspendUser: async (key) => performQuery(client, SUSPEND_USER, { userKey: { key } }),
    updateUser: async (key, userInfo) => performQuery(client, UPDATE_USER, { userKey: { key }, userInfo }),
    listGroups: async () => performQuery(client, LIST_GROUPS, {}),
  }
};

export default newUserClient;