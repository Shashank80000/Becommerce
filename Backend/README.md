# B.Ecommerce Cleaning Products API

Production-oriented MVP backend for a B2B cleaning products supplier. It supports public product/category/solution browsing, quote requests, contact messages, and API-key-protected admin catalogue and quote operations.

## Stack

Node.js, Express, MongoDB, Mongoose, dotenv, cors, helmet, morgan, express-rate-limit.

## Setup

```bash
npm install
copy .env.example .env
npm run seed
npm run dev
```

MongoDB must be running at `MONGO_URI` before seeding or starting the server. The database defaults to `cleaning_products`.

## Environment

- `PORT`: API port, default `5000`
- `MONGO_URI`: MongoDB connection string
- `CLIENT_URL`: allowed frontend origin
- `ADMIN_API_KEY`: temporary admin key sent as `x-admin-key`
- `NODE_ENV`: `development` or `production`

## Public endpoints

- `GET /health`
- `GET /api/products?page=1&limit=12&search=floor&category=floor-cleaners&application=Factory&packSize=20L&featured=true&sort=newest`
- `GET /api/products/:slug`
- `GET /api/categories`
- `GET /api/categories/:slug`
- `GET /api/solutions`
- `GET /api/solutions/:slug`
- `POST /api/quotes`
- `GET /api/quotes/:quoteId`
- `POST /api/contact`

Quote example:

```json
{
  "name": "Rahul Sharma",
  "companyName": "ABC Industries",
  "phone": "9876543210",
  "email": "rahul@example.com",
  "product": "PRODUCT_OBJECT_ID",
  "quantity": 500,
  "unit": "L",
  "deliveryLocation": "Noida",
  "businessType": "Factory",
  "message": "Need bulk pricing."
}
```

## Admin endpoints

Send `x-admin-key: change_this_secret` (or the value configured in `.env`).

- `GET /api/admin/dashboard`
- `GET|POST /api/admin/products`
- `PUT|DELETE /api/admin/products/:id`
- `GET|POST /api/admin/categories`
- `PUT|DELETE /api/admin/categories/:id`
- `GET|POST /api/admin/solutions`
- `PUT|DELETE /api/admin/solutions/:id`
- `GET /api/admin/quotes?page=1&limit=20&status=NEW&search=ABC`
- `PATCH /api/admin/quotes/:id/status` with `{ "status": "CONTACTED" }`
- `GET /api/admin/contacts`

All responses use `{ success, data, message }`; validation errors additionally include `errors`. Product/category/solution deletes are soft deletes.
