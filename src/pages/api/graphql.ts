import type { NextApiRequest, NextApiResponse } from 'next'
import { useExtendContext } from '@envelop/core';
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from '../../api/resolvers';
import typeDefs from "../../api/typeDefs";
import { authorize } from 'lib/google';

const config = {
  runtime: "experimental-edge",
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false
  }
}

const schema = makeExecutableSchema({ resolvers, typeDefs });

export default createYoga<{ req: NextApiRequest,  res: NextApiResponse }>({
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
  schema,
  graphiql: {
    defaultQuery: /* GraphQL */ `
      query allUsers {
        users {
          id
          primaryEmail
          name {
            fullName
            givenName
            familyName
          }
          groups {
            id
            name
            email
            description
          }
          isAdmin
          isDelegatedAdmin
          creationTime
          agreedToTerms
          changePasswordAtNextLogin
          isMailboxSetup
          suspended
          suspensionReason
          sshPublicKeys {
            key
            fingerprint
            expirationTimeUsec
          }
          additionalData {
            github {
              username
            }
          }
        }
      }
    `,
  },
  plugins: [
    useExtendContext(async contextSoFar => {
      return {
        auth: await authorize()
      }
    }),
  ],
})