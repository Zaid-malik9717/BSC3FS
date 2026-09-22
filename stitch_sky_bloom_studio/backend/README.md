# Flora Sky Bloom Studio - Backend REST API

A modular, high-performance Node.js & Express REST API for Flora Sky Bloom Studio floral boutique.

## Features

- **Products Catalog API**: Search, category filters (scented, hypoallergenic, single stems, curated), sorting, stem options, care guides, reviews.
- **Bouquet Builder API**: Real-time pricing calculations for custom floral arrangements, stem multipliers, luxury wraps, and silk ribbons.
- **Personalized Notes API**: Botanical templates, wax seal options, live validation.
- **Promo Codes Engine**: Discount validation with minimum spend checks (`FLORA10`, `AZURE20`, `WELCOME10`, `BLOOM15`).
- **Orders & Tracking API**: Checkout processing, automated `FL-XXXXXX` tracking number generation, pricing breakdown with tax and cold-chain shipping.
- **Inquiries & Newsletter**: Custom event bookings, wedding consultations, and subscriber management.
- **Zero-Setup Persistent Database**: File-backed JSON store in `backend/data/` with auto-seeding and atomic writes.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Or start in standard mode:
```bash
npm start
```
The server will start at `http://localhost:5000`.

## API Endpoints

### Health Check
- `GET /api/health` - Server uptime, health status, and system metrics.

### Products
- `GET /api/products` - List all products (supports `?category=`, `?search=`, `?sortBy=price-low|price-high|rating|name`, `?isFragrant=true`, `?isHypoallergenic=true`, `?isSingleStem=true`)
- `GET /api/products/:id` - Product detail by ID with related items and reviews
- `POST /api/products` - Add new product
- `PUT /api/products/:id` - Update existing product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/:id/reviews` - Submit review with rating (1-5) and comment

### Bouquet Builder
- `GET /api/builder/options` - Retrieve flower varieties, color palettes, size tiers, wraps, and ribbons
- `POST /api/builder/calculate-price` - Calculate dynamic price for custom bouquet combinations
- `POST /api/builder/save-design` - Save custom bouquet creation

### Personalized Notes
- `GET /api/notes/templates` - Card templates and wax seal designs
- `POST /api/notes/preview` - Validate and format note preview

### Promo Codes
- `GET /api/promos` - List active promotions
- `POST /api/promos/validate` - Validate promo code with `{ code: "FLORA10", subtotal: 100 }`
- `POST /api/promos` - Create new promo code (Admin)

### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/:orderNumber` - Get order status and tracking details
- `POST /api/orders` - Place new order
- `PATCH /api/orders/:orderNumber/status` - Update order stage

### Inquiries & Newsletter
- `POST /api/inquiries` - Submit wedding / custom floral arrangement inquiry
- `POST /api/inquiries/newsletter` - Subscribe to newsletter for instant 10% promo code
