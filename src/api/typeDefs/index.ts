import { typeDefs as scalarTypedefs } from 'graphql-scalars'
import { mergeTypeDefs } from '@graphql-tools/merge'
import userTypeDefs from './users'
import groupTypeDefs from './groups'

const types = mergeTypeDefs([
  scalarTypedefs,
  userTypeDefs,
  groupTypeDefs,
])

export default types
