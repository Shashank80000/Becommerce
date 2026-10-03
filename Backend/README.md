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

- `PORT`: API port, default `5000` (hosting platforms normally provide this automatically)
- `MONGO_URI`: MongoDB connection string. Use the MongoDB Atlas `mongodb+srv://` URI in production.
- `CLIENT_URL`: comma-separated allowed frontend origins. This is required when `NODE_ENV=production`, for example `https://www.example.com,https://example.com`. Use origins only: do not include `/api` or a trailing slash.
- `ADMIN_API_KEY`: admin login secret; it is exchanged for a JWT and never sent on admin API requests
- `JWT_SECRET`: long random secret used to sign admin JWTs
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
- `GET /api/quotes/:quoteId` (status only: quote ID, product, status, date)
- `POST /api/contact`

Quotes are submitted as `multipart/form-data` so an optional PDF can be
attached in the `attachment` field (PDF only, max 10 MB, stored in MongoDB
GridFS bucket `quoteAttachments`). Required fields: `name`, `companyName`,
`phone`, `product` (product name; `productSlug` optionally links the catalogue
record) and `deliveryLocation`.

```bash
curl -X POST http://localhost:5000/api/quotes \
  -F name="Rahul Sharma" -F companyName="ABC Industries" -F phone=9876543210 \
  -F product="Heavy Duty Floor Cleaner" -F deliveryLocation=Noida \
  -F attachment=@spec-sheet.pdf
```

Fields (JSON shown for readability):

```json
{
  "name": "Rahul Sharma",
  "companyName": "ABC Industries",
  "phone": "9876543210",
  "email": "rahul@example.com",
  "product": "Heavy Duty Floor Cleaner",
  "productSlug": "heavy-duty-floor-cleaner",
  "deliveryLocation": "Noida",
  "businessType": "Factory",
  "message": "Need bulk pricing. 500 L per month."
}
```

## Admin endpoints

First log in with the admin key, then use the returned JWT:

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d "{\"apiKey\":\"change_this_secret\"}"
```

```bash
curl http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

- `GET /api/admin/dashboard`
- `GET|POST /api/admin/products`
- `PUT|DELETE /api/admin/products/:id`
- `GET|POST /api/admin/categories`
- `PUT|DELETE /api/admin/categories/:id`
- `GET|POST /api/admin/solutions`
- `PUT|DELETE /api/admin/solutions/:id`
- `GET /api/admin/quotes?page=1&limit=20&status=NEW&search=ABC`
- `PATCH /api/admin/quotes/:id/status` with `{ "status": "CONTACTED" }`
- `GET /api/admin/quotes/:id/attachment` downloads the quote's PDF (`?inline=1` to view in the browser)
- `GET /api/admin/contacts`

All responses use `{ success, data, message }`; validation errors additionally include `errors`. Product/category/solution deletes are soft deletes.

## Deployment

Set the following environment variables in the backend hosting provider; do not
commit them to Git. After changing `JWT_SECRET`, redeploy the backend and sign
in again because existing tokens will no longer be valid:

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/cleaning_products?retryWrites=true&w=majority
CLIENT_URL=https://www.example.com,https://example.com
ADMIN_API_KEY=a-long-random-secret
JWT_SECRET=a-different-long-random-secret
```

Start command: `npm start`.

### Render

This repository is a monorepo. Deploy the `Backend` directory as the web service, not the repository root. A root-level `render.yaml` is included for Blueprint deployments and configures:

- Build command: `npm ci`
- Start command: `npm start`
- Health check path: `/health`

For an existing Render service that was created without the Blueprint, update its settings to **Root Directory** `Backend`, **Build Command** `npm ci`, and **Start Command** `npm start`, then redeploy. Do not use `npm run dev` in Render: it invokes `nodemon`, which is intentionally a development-only dependency.

In MongoDB Atlas, create a database user and allow the deployed backend's outbound IP address in **Network Access**. Rotate any password that has been shared or committed. The API health check is available at `/health`.

For a Vercel frontend deployed separately from this API, set `VITE_API_URL=https://YOUR-RENDER-SERVICE.onrender.com/api` in Vercel and redeploy the frontend. In Render, set `CLIENT_URL` to the exact Vercel frontend origin, for example `https://YOUR-PROJECT.vercel.app`.

If Render logs `querySrv ECONNREFUSED _mongodb._tcp...`, the MongoDB Atlas SRV DNS lookup failed before Express could start. Verify that `MONGO_URI` is the full current Node.js driver URI copied from Atlas, that the Atlas cluster is running, and that the Render service can use DNS and connect to Atlas. The backend logs now include the error name and code to distinguish DNS, authentication, and connection failures.
