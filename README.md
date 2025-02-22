This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Resources And Libraries

- [`React Query`]: used to fetch resources and handling errors and pending api calls.
- [`Redux`]: user to share required data between pages and components.
- [`Lodash`]: to use helper functions.

## Learn More

- The homepage fetches product data from the "/product" API using React Query. The fetched data is stored in local state, with pagination dynamically displaying 10 products per page.
-  Clicking on a product navigates the user to the product details page. The product ID is passed via route parameters to fetch detailed information from the "/product/:id" API.
- Users can adjust product quantities and add items to their shopping cart, which is accessible from the navbar on both the shop and details pages.
- The shopping cart state is managed using Redux, ensuring availability across all pages.
- Clicking the shopping bag icon in the navigation bar opens a sidebar displaying all added products, including individual and total prices.
- Users can remove items from the cart, and if they add a product that is already in the cart, its quantity updates instead of duplicating entries.

## Deployment

App already deployed and available at: [`Vercel`](https://online-shop-rv.vercel.app/)
