# Amazon Clone

## Project Overview

This project is a front-end Amazon-style e-commerce application built as a technical assessment. It includes a **Product Listing Page (PLP)** with filters and pagination, and a **Product Detail Page (PDP)** for individual products. All product data is loaded dynamically from the public [DummyJSON Products API](https://dummyjson.com/docs/products).

The application focuses on reusable React components, client-side filtering and pagination, React Router navigation, and clear loading and error states.

## Features

- Responsive Product Listing Page with filter sidebar and product grid
- Dynamic product fetching using DummyJSON API
- Product cards with image, title, price, rating, brand, and category
- Category filter (single selection, including “All Categories”)
- Minimum and maximum price range filter with Apply
- Multi-select brand filter
- Combined filtering (category, price, and brands together)
- Client-side pagination over the full filtered dataset (8 products per page)
- Product Detail Page with image, description, metadata, and reviews
- Navigation between PLP and PDP via React Router (`/product/:id`)
- Preservation of selected filters and pagination when returning from PDP
- Lucide React icons across the UI
- Loading, empty, and error states
- Responsive layout for desktop, tablet, and mobile

## Tech Stack

- React.js
- Vite
- JavaScript (JSX)
- CSS
- React Router
- Lucide React
- DummyJSON API

## Setup Instructions

1. Clone the GitHub repository:

   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the application directory:

   ```bash
   cd amazonWebsite/amazonclone
   ```

   If the repository root is only the Vite app, use:

   ```bash
   cd amazonclone
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal (typically `http://localhost:5173`).

### Other scripts

```bash
npm run build   # production build
npm run preview # preview production build
npm run lint    # ESLint
```

## Assumptions Made

- **DummyJSON** is the single source of product data; no custom backend is required.
- Product fields (title, price, rating, brand, category, description, reviews, images) match the DummyJSON product schema.
- **Category filtering** uses `GET /products/categories` for the list and `GET /products/category/{slug}?limit=0` for products in a category; “All Categories” uses `GET /products?limit=0`.
- **Price and brand filtering** are applied on the client over the full product set for the selected category scope.
- **Brand options** are derived from unique `brand` values in the complete catalog (`limit=0` fetch), not from a separate API.
- **Pagination** slices the filtered array locally (8 items per page); page count is based on filtered length, not per-page API calls.
- **Product details** are loaded per visit with `GET /products/{id}` using the route parameter.
- Header search, cart, and account controls are visual placeholders and are not functional.
- Invalid or missing product IDs show an error state on the PDP.

## Architectural Decisions

### Component structure

- **Pages**: `ProductListingPage`, `ProductDetailPage`, `NotFoundPage`
- **Reusable UI**: product cards/grid, filters, pagination, header, loading/error/empty states, shared `StarRating`
- **Services**: `productsApi.js` centralizes DummyJSON fetch calls
- **Utilities**: `filterProducts.js` (price/brand logic), `plpQuery.js` (URL query serialization for PLP state)

### API integration

- Initial PLP load fetches categories and all products in parallel.
- Category changes trigger a category endpoint fetch; price and brand filters do not refetch.
- PDP fetches a single product by ID when the route `id` changes.

### Routing

- `BrowserRouter` in `App.jsx`
- `/` → PLP, `/product/:id` → PDP, unknown routes → `/404`
- Product cards link to `/product/:id` with `location.state.from` set to the current PLP path and query string.

### Filter and pagination state

- PLP filter and page state is mirrored in **URL search parameters** (`category`, `brands`, `minPrice`, `maxPrice`, `minInput`, `maxInput`, `page`).
- State is initialized from the URL on mount; updates sync back with `replace: true`.
- Returning from PDP uses `navigate(state.from)`, restoring the previous query (filters and page).
- Opening PDP directly falls back to `/` on Back.

### Loading and error handling

- PLP shows loading for initial catalog and category fetches; brand/price changes do not refetch.
- PDP uses a keyed inner view (`ProductDetailView`) so loading resets per product ID without violating React effect lint rules.
- Shared `ErrorState` and `LoadingState` components keep messaging consistent.

## Improvements If Given More Time

These are **not** implemented today; they are realistic next steps:

- Shopping cart and checkout flow
- Wishlist / favorites
- Functional header search and product sorting
- Enhanced image gallery (multiple images with selection)
- API caching, request deduplication, and stronger performance tuning
- Unit and integration tests (components, filters, routing)
- Deeper accessibility (keyboard traps in mobile filter drawer, live regions)
- Further mobile UX polish (skeleton loaders, optimistic UI)

## Project structure (high level)

```
amazonclone/
├── src/
│   ├── App.jsx
│   ├── components/
│   ├── pages/
│   ├── services/productsApi.js
│   └── utils/
├── package.json
└── README.md
```