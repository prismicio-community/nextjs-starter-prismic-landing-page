# Prismic + Next.js Landing Page Starter

Want to quickly get started building your own project with [Prismic](https://prismic.io) and [Next.js](https://nextjs.org)? This project includes a landing page, a set of [slices](https://prismic.io/docs/slices) to build more pages, and basic configuration.

- **Demo**: [Open live demo](https://nextjs-starter-prismic-landing-page.vercel.app)
- **Learn more about Prismic and Next.js**: [Prismic Next.js Documentation](https://prismic.io/docs/nextjs)

![Website screenshot](https://github.com/user-attachments/assets/d6ce29aa-084f-496d-84e9-75cfd026fe92)

## 🚀 Quick start

To start a new project using this starter:

1. Visit <https://prismic.io/dashboard>.
2. Create a new Prismic repository by selecting **Next.js**.
3. Select the **Landing Page starter**.
4. Fill out your repository details and continue with the steps given in Prismic.

When you're ready to start your project, run the following command:

```sh
npm run dev
```

### 🚀 Quick start with Vercel

You can also create a new project on [Vercel](https://vercel.com) by clicking the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fprismicio-community%2Fnextjs-starter-prismic-landing-page)

Then clone the created GitHub repository locally and run the following command to install dependencies:

```sh
npm install
```

When you're ready to start your project locally, run the following command:

```sh
npm run dev
```

## How to use your project

To edit the content of this project, go to [prismic.io/dashboard](https://prismic.io/dashboard), click on the repository for this website, and start editing.

### Create a page

To create a page, click on the green pencil icon, then select **Page**.

Pages are made of slices. You can add and rearrange slices to your pages.

Your new page will be accessible by its URL, but it won't appear on the website automatically. To let users discover it, add it to the navigation.

### Preview documents

If you chose this starter when you created a new repository from the Prismic Dashboard, then your repository is preconfigured with previews on localhost. To change the preview configuration or add previews to your production or staging environments, see [Preview draft content](https://prismic.io/docs/nextjs#preview-draft-content) in the Prismic documentation.

### Customize this website

This website is preconfigured with Prismic. It has three Prismic packages installed:

- `@prismicio/client` provides helpers for fetching content from Prismic
- `@prismicio/react` provides React components for rendering content from Prismic
- `@prismicio/next` provides a Next.js-specific components components to configure Prismic previews, display links, and display images

These packages are already integrated in this app. Take a look at the code to see how they're used.

### Edit the code

There are two steps to rendering content from Prismic in your Next.js project:

1. Fetch content from the Prismic API using `@prismicio/client`.
2. Template the content using components from `@prismicio/react` and `@prismicio/next`.

Here are some of the files in your project that you can edit:

- `prismicio.ts` - This file includes configuration for `@prismicio/client` and exports useful API helpers.
- `app/layout.tsx` - This is your layout component, which includes configuration for content previews.
- `app/page.tsx` - This is the app homepage. It queries and renders the homepage document from the Prismic API.
- `app/[uid]/page.tsx` - This is the page component, which queries and renders a page document from your Prismic repository based on the UID.
- `slices/*/index.tsx` - Each slice in your project has an index.tsx file that renders the slice component. Edit this file to customize your slices.

These are important files that you should leave as-is:

- `app/api/exit-preview/route.ts` - Do not edit or delete this file. This is the API endpoint to close a Prismic preview session.
- `app/api/preview/route.ts` - Do not edit or delete this file. This is the API endpoint to launch a Prismic preview session.
- `app/slice-simulator/page.tsx` - Do not edit or delete this file. This file simulates your slice components in development.
- `slices/` - This directory contains slice components. To customize a slice template, you can edit the slice's index.tsx file. To add slices, delete slices, or edit slice models, use the Type Builder (more info below).

Learn more about [fetching content](https://prismic.io/docs/nextjs#fetch-content) and [displaying content](https://prismic.io/docs/nextjs#display-content) in the Prismic documentation.

### Deploy to the web

Learn how to [deploy your website](https://prismic.io/docs/nextjs#deploy) in the Prismic documentation.

### Edit content models with the Type Builder

This project uses the [Type Builder](https://prismic.io/docs/type-builder), Prismic's cloud-based interface for modeling your page types and slices. Model your content in the Type Builder, then use the [Prismic CLI](https://prismic.io/docs/cli) to sync your models into your codebase, where you can save and version them:

```sh
npx prismic pull
```

If you change or add to your page types, you'll need to update your route handling to match. Routes are configured in the `routes` array in `prismic.config.json`.

## Documentation

For the official Prismic documentation, see [Prismic's guide for Next.js](https://prismic.io/docs/nextjs) or the [technical references for the installed Prismic packages](https://prismic.io/docs/apis).

## License

```
Copyright 2013-2025 Prismic <contact@prismic.io> (https://prismic.io)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
