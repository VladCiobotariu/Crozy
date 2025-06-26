This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## GraphQL code gen
If you need to modify graphql query then modigy `graphql` file in `./src/graphql/` folder and run 
```bash
npm run codegen
```

It will automatically generate typescript files.

Find out more in [GraphQL codegen documentation](https://www.the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-apollo) and [Best practices](https://the-guild.dev/blog/graphql-codegen-best-practices)



## Storybook
To run local server for storybook:

```bash
    npm run storybook
    #or
    yarn storybook
```
Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.

You can start adding new stories into folder `src/components/stories`
Name of the files: `*.stories.tsx`


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Configure Editor

- **VsCode**: [config](https://www.educative.io/answers/how-to-set-up-prettier-and-automatic-formatting-on-vs-code)
- **Webstorm**: [config](https://prettier.io/docs/en/webstorm.html)