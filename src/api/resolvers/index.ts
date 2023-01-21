import { mergeResolvers } from '@graphql-tools/merge'
import { resolvers as scalarResolvers } from 'graphql-scalars'
import groupResolvers from './groups'
import userResolvers from './users'

const resolvers = [
  scalarResolvers,
  userResolvers,
  groupResolvers,
]

export default mergeResolvers(resolvers)
