# SPIRE – Plant Shop Part 1

A responsive school project built with React, Redux Toolkit and React Router.

## Live demo

https://plantshop-part-1.vercel.app/

## Features

- Home, Shop, Cart and Checkout with shared navigation.
- Redux profit demo: selling adds 5 kr; buying subtracts 2 kr.
- Add products, change quantities, remove products and clear the cart.
- Review an order and place a demo order to clear the cart and return Home.

## Plant data

The catalogue is built from 13 selected plants fetched from Trefle.
Scientific names come from the API. Local product data supplies
prices, images and stable cart IDs, matched using trefleId.

React fetches `/api/plants`. This Vercel server function calls Trefle
using a private server-side token. The token is not returned to React.

Local products remain available if the request fails.
Loading and error messages are displayed.

Data: [Trefle.io](https://trefle.io/) (CC BY 4.0).

## Run locally

Install dependencies:

```bash
npm install
```

Create a free Trefle account and obtain an access token.
In your Vercel project, add `TREFLE_API_TOKEN` as an environment variable
for Development, Preview and Production. Never commit or share its value.

Start the application and server function:

```bash
npm run dev
```

Log in and link the appropriate Vercel project when prompted.
Open the local URL printed in the terminal.

Use Node.js 22 LTS. npm run dev starts both Vite and the local API function through Vercel CLI.

## Checks and build

```bash
npm run lint
npm run build
```

The production output directory is `docs/`.

## Deployment

The project uses Vercel's Git integration with the `main` branch.
The output directory is `docs`.
Environment variable changes require a new deployment.

## Structure

- `api`: Vercel server function.
- `src/pages` and `src/components`: pages and UI components.
- `src/features` and `src/app`: Redux slices and store.
- `src/data` and `src/assets`: local catalogue and images.

## Scope

Checkout is a demonstration without real payment or permanent order storage.
Cart contents and profit reset when the page reloads.

The Vercel server function is an additional implementation choice
to keep the Trefle access token private.

## Automated checks

GitHub Actions runs lint and build on pushes and pull requests to main.
Vercel deploys main through its Git integration.
The checks do not currently gate the Vercel deployment.