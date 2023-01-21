import type { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/api/typeDefs",
  generates: {
    "./src/api/lib/resolverTypes.ts": {
      config: {
        useIndexSignature: true,
      },
      plugins: ['typescript', 'typescript-resolvers']
    }
  }
};

export default config;
