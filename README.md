# SPIRE – Plant Shop Part 1

A responsive plant shop built with React, Redux Toolkit and React Router.

## Live demo

https://plantshop-part-1.vercel.app/

## Features

- Home, Shop, Cart and Checkout pages with shared navigation.
- Redux profit demo: selling a plant adds 5 kr, and buying a plant subtracts 2 kr.
- Add products to the cart. Adding the same product increases its quantity.
- Change quantities, remove individual products or clear the cart.
- View an order summary with quantities and the total price.
- Place a demo order to clear the cart and return to Home.
- Responsive layouts and keyboard-accessible controls.

## Plant data

The shop uses a local catalogue of 13 plants with local prices and images.

Perenual API data updates the names of two matched plants: Monstera and
Dragon Tree. API images are used when available unless a local image
override is selected.

Local products remain available if the API request fails. The page displays
loading and error messages.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root:

   ```env
   VITE_PERENUAL_API_KEY=your_perenual_api_key
   ```

   Replace the placeholder with your own Perenual API key.
   Do not commit this file. Variables prefixed with `VITE_` are exposed
   in the browser; this setup does not keep the API key secret.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000.

## Checks and production build

```bash
npm run lint
npm run build
```

The production build is generated in `docs/`.

## Deployment

The project is deployed on Vercel using the `main` branch.
The output directory is `docs`.

Set `VITE_PERENUAL_API_KEY` in the Vercel environment variables before
deploying. Environment variable changes require a new deployment.

## Project structure

- `src/pages`: page components.
- `src/components`: UI components.
- `src/features`: Redux slices for cart and profit.
- `src/app`: Redux store.
- `src/data`: local product catalogue.
- `src/assets`: local plant images.

## Scope

This is a school project. Checkout demonstrates completing an order;
it does not process payments or store orders on a server.

Cart contents and profit are held in memory and reset when the page reloads.
