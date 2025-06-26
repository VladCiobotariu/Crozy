import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://127.0.0.1:7071/api/GraphQL?sdl",
  documents: ["src/**/*.tsx", "!src/graphql/*", "!src/generated/*"],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
    },
  },
};

export default config;