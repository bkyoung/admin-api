import { JWT } from 'google-auth-library';
import { google } from 'googleapis';

const scopes = [
  'https://www.googleapis.com/auth/admin.directory.group',
  'https://www.googleapis.com/auth/admin.directory.group.member',
  'https://www.googleapis.com/auth/admin.directory.user',
  'https://www.googleapis.com/auth/admin.directory.user.security',
  'https://www.googleapis.com/auth/admin.directory.userschema',
  'https://www.googleapis.com/auth/admin.directory.rolemanagement',
];

export const authorize = async (subject = 'admin@company.com') => {
  const { client_email: email, private_key: key } = JSON.parse(process.env.GOOGLE_PRIVATE_KEY as string)
  const auth = new JWT({
    email,
    key,
    subject, // some principal with admin to pose as
    scopes
  });
  return auth;
}

export const createUser = async (auth, user) => {
  const { primaryEmail, name: { givenName, familyName } } = user
  if (!primaryEmail || !familyName || !givenName) throw Error('Please provide at least primaryEmail, familyName, and givenName when creating a new User');
  const service = google.admin({ version: 'directory_v1', auth });
  try {
    const res = await service.users.insert({ requestBody: { ...user, password: 'WelcomeToTheFam!', changePasswordAtNextLogin: true, } });
    const { data } = res
    return data
  } catch (err) {
    console.log(err)
    throw Error(err.message)
  }
}


export const deleteUser = async (auth, userKey) => {
  const { primaryEmail, id } = userKey
  if (!primaryEmail && !id) throw Error('Please provide either primaryEmail or id when deleting a User');
  const service = google.admin({ version: 'directory_v1', auth });
  try {
    const res = await service.users.delete({ userKey: primaryEmail || id });
    const { status } = res
    return status === 201 ? true : false
  } catch (err) {
    console.log(err)
    throw Error(err.message)
  }
}

export const updateUser = async (auth, userKey, requestBody) => {
  const { primaryEmail, id } = userKey
  if (!primaryEmail && !id) throw Error('Please provide either primaryEmail or id when updating a User');
  const service = google.admin({ version: 'directory_v1', auth });
  try {
    const res = await service.users.update({ userKey: primaryEmail || id, requestBody });
    const { data } = res
    return data
  } catch (err) {
    console.log(err)
    throw Error(err.message)
  }
}

// limit = 0 means return all results.
export const listAllUserAccounts = async (auth, limit = 0) => {
  const service = google.admin({ version: 'directory_v1', auth });
  const req = {
    customer: 'my_customer',
    orderBy: 'email',
    projection: 'full',
  };
  
  if (limit) req['maxResults'] = limit;

  const res = await service.users.list(req);

  const users = res.data.users;
  if (!users || users.length === 0) {
    return [];
  }

  return users;
}

export const listUserAccount = async (auth, userKey) => {
  const service = google.admin({ version: 'directory_v1', auth });
  const req = {
    customer: 'my_customer',
    projection: 'full',
    userKey: userKey.key,
  };
  
  const res = await service.users.get(req);

  const user = res.data;
  if (!user || Object.keys(user).length === 0) {
    return {};
  }

  return user;
}

// createGroup
export const createGroup = async (auth, group) => {
  const { email, name, description } = group
  if (!email || !name || !description) throw Error('Please provide email, name, and description when creating a new Group');
  const service = google.admin({ version: 'directory_v1', auth });
  try {
    const res = await service.groups.insert({ requestBody: { ...group } });
    const { data } = res
    return data
  } catch (err) {
    console.log(err)
    throw Error(err.message)
  }
}

// deleteGroup
export const deleteGroup = async (auth, groupKey) => {
  const { email, id } = groupKey
  if (!email && !id) throw Error('Please provide either group id or email key when deleting a group');
  const service = google.admin({ version: 'directory_v1', auth });
  try {
    const res = await service.groups.update({ groupKey: id || email });
    const { status } = res
    return status === 200 ? true : false
  } catch (err) {
    console.log(err)
    throw Error(err.message)
  }
}

// updateGroup
export const updateGroup = async (auth, groupKey, group) => {
  if (!groupKey.email && !groupKey.id) throw Error('Please provide either group id or email key when updating a group');
  const service = google.admin({ version: 'directory_v1', auth });
  try {
    const res = await service.groups.update({ groupKey, requestBody: { ...group } });
    const { data } = res
    return data
  } catch (err) {
    console.log(err)
    throw Error(err.message)
  }
}

// getGroup
export const getGroup = async (auth, groupKey) => {
  const { value } = groupKey
  const service = google.admin({ version: 'directory_v1', auth });
  try {
    const res = await service.groups.get({ groupKey: value });
    const { data } = res
    return data
  } catch (err) {
    console.log(err)
    throw Error(err.message)
  }
}

// listGroups
export const listAllGroups = async (auth, limit = 0) => {
  const service = google.admin({ version: 'directory_v1', auth });
  const req = {
    customer: 'my_customer',
    orderBy: 'email',
  };
  
  if (limit) req['maxResults'] = limit;

  console.log('inside listAllGroups, calling groups.list', {req})
  const res = await service.groups.list(req);

  console.log(JSON.stringify(res,null,2))
  const groups = res.data.groups;
  if (!groups || groups.length === 0) {
    return [];
  }

  return groups;
}

// listGroupMembers
export const listGroupMembers = async (auth, groupKey) => {
  const { email, id } = groupKey
  if (!email && !id) throw Error('Please provide either group id or email key when retrieving a group');
  const service = google.admin({ version: 'directory_v1', auth });
  try {
    const res = await service.members.list({ groupKey: id || email });
    const { members } = res.data
    return members
  } catch (err) {
    console.log(err)
    throw Error(err.message)
  }
}

/**
 * Retrieve all of the groups a user belongs to
 * @param auth - JWT for authenticating to Google API
 * @param userKey - the user ID or email for whom groups are being searched
 * @returns - list of Group objects the user is a member of
 */
export const listUserGroups = async (auth, userKey) => {
  const { email, id } = userKey
  if (!email && !id) throw Error("Please provide either the user's id or email key when retrieving a user's groups");
  const service = google.admin({ version: 'directory_v1', auth });
  try {
    const res = await service.groups.list({ userKey: id || email });
    const { groups } = res.data
    return groups
  } catch (err) {
    console.log(err)
    throw Error(err.message)
  }
}

// addUserToGroup
export const addUserToGroup = async (auth, member, groupKey) => {
  if (!groupKey.email && !groupKey.id) throw Error('Please provide either group id or email key when adding a user to a group');
  if (!member.email && !member.id) throw Error('Please provide either user id or email key when adding a user to a group');
  const service = google.admin({ version: 'directory_v1', auth });
  try {
    const res = await service.members.insert({
      groupKey: groupKey.id || groupKey.email,
      requestBody: { ...member },
    });
    const { data } = res
    return data
  } catch (err) {
    console.log(err)
    throw Error(err.message)
  }
}

// removeUserFromGroup
export const removeUserFromGroup = async (auth, memberKey, groupKey) => {
  if (!groupKey.email && !groupKey.id) throw Error('Please provide either group id or email key when adding a user to a group');
  if (!memberKey.email && !memberKey.id) throw Error('Please provide either user id or email key when adding a user to a group');
  const service = google.admin({ version: 'directory_v1', auth });
  try {
    const res = await service.members.delete({
      groupKey: groupKey.id || groupKey.email,
      memberKey: memberKey.id || memberKey.email,
    });
    const { status } = res
    return status === 201 ? true : false
  } catch (err) {
    console.log(err)
    throw Error(err.message)
  }
}