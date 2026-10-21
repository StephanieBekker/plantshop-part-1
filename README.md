# SPIRE: Plant Shop Part 1

A responsive plant shop built with React, Redux Toolkit and React Router.
Browse 13 plants, view product details, manage a cart and complete a demo checkout.

## Live demo

[Open SPIRE](https://plantshop-part-1.vercel.app/)

## Run locally

Use Node.js 22 LTS. From the project folder, install dependencies:

```bash
npm install
```

The plant API runs through a Vercel Function. Link the project to Vercel when prompted
and configure `TREFLE_API_TOKEN` for Development, Preview and Production in Vercel.
The API token stays on the server and must not be committed.

Start the app and local API:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Check and build

```bash
npm run lint
npm run build
```

The build is written to `docs/`. GitHub Actions runs lint and build.
The app is deployed on Vercel.

Botanical data: [Trefle.io](https://trefle.io/) ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)).
Plant images and supplementary care descriptions are stored locally.
Checkout is a demonstration without payment or permanent order storage.
