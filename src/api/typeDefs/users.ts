const userTypeDefs = /* GraphQL */`
#############################################################################
# Scalars
#############################################################################
scalar DateTime
scalar Email
scalar PhoneNumber
scalar PostalCode

#############################################################################
# Types
#############################################################################
type ProductLicense {
  productName: String
  license: String
}

type Github {
  username: String
}

type UserEmail {
  primary: Boolean
  type: EmailType
  customType: String
  address: Email!
}

type UserName {
  givenName: String
  familyName: String
  fullName: String
}

type UserNotes {
  github: Github
  productLicenses: [ProductLicense]!
}

type UserSshPublicKeys {
  key: String
  fingerprint: String
  expirationTimeUsec: Int
}

type User {
  id: ID
  primaryEmail: String
  name: UserName
  groups: [Group]
  isAdmin: Boolean
  isDelegatedAdmin: Boolean
  agreedToTerms: Boolean
  suspended: Boolean
  changePasswordAtNextLogin: Boolean
  emails: [UserEmail]
  isMailboxSetup: Boolean
  suspensionReason: String
  creationTime: String
  sshPublicKeys: [UserSshPublicKeys]
  additionalData: UserNotes
}

#############################################################################
# Enums
#############################################################################
enum EmailType {
  custom
  home
  other
  work
}

#############################################################################
# Input
#############################################################################
input NewUserInput {
  primaryEmail: Email!
  name: UserNameInput!
}

input UpdateUserInput {
  primaryEmail: String
  name: UserNameInput
  suspended: Boolean
  changePasswordAtNextLogin: Boolean
  emails: [UserEmailInput]
  sshPublicKeys: [UserSshPublicKeysInput]
  additionalData: UserNotesInput
}

input UserEmailInput {
  primary: Boolean
  type: EmailType
  customType: String
  address: Email!
}

input UserKey {
  id: ID,
  primaryEmail: Email,
}

input UserNameInput {
  givenName: String!
  familyName: String!
  fullName: String
}

input UserNotesInput {
  github: String
}

input UserSearchKey {
  key: String!
}

input UserSshPublicKeysInput {
  key: String
  fingerprint: String
  expirationTimeUsec: Int
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
  user(userKey: UserSearchKey!): User
  users: [User]!
}

type Mutation {
  create(user: NewUserInput!): User!
  delete(userKey: UserKey!): Boolean!
  update(userKey: UserKey!, userInfo: UpdateUserInput!): User!
}
`

export default userTypeDefs