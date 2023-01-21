const groupTypeDefs = /* GraphQL */`
#############################################################################
# Scalars
#############################################################################

#############################################################################
# Types
#############################################################################
type Group {
  id: ID
  email: Email
  name: String
  description: String
  directMembersCount: String
  members: [Member]
}

type Member {
  id: String
  email: String
  role: String
  type: String
  status: String
  delivery_settings: String
}

#############################################################################
# Enums
#############################################################################

#############################################################################
# Input
#############################################################################
input NewGroupInput {
  email: Email!
  name: String!
  description: String
}

input NewGroupMember {
  id: String
  email: String
}

input UpdateGroupInput {
  id: ID
  email: Email
  name: String
  description: String
}

input GroupKey {
  id: ID,
  email: Email,
}

"""
The value in an identifier field to search for (e.g. the actual id or email of the group)
"""
input GroupSearchKey {
  value: String!
}

"""
The MemberKey can be the id/email for any member of a group (which can be a user OR a group itself)
"""
input MemberKey {
  id: ID,
  email: Email
}
#############################################################################
# Interfaces
#############################################################################

#############################################################################
# Unions
#############################################################################

#############################################################################
# Queries and Mutations
#############################################################################
type Query {
  group(groupKey: GroupSearchKey!): Group
  groups: [Group]!
}

type Mutation {
  addUserToGroup(member: NewGroupMember!, groupKey: GroupKey!): Group!
  removeUserFromGroup(memberKey: MemberKey!, groupKey: GroupKey!): Boolean!
  createGroup(group: NewGroupInput!): Group!
  deleteGroup(groupKey: GroupKey!): Boolean!
  updateGroup(groupKey: GroupKey!, groupInfo: UpdateGroupInput!): Group!
}
`

export default groupTypeDefs