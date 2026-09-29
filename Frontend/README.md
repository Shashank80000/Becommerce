# B.Ecommerce frontend deployment

## Local development

```bash
npm install
npm run dev
```

The Vite development server proxies `/api` requests to `http://localhost:5000` by default. To use another local API address, set `VITE_DEV_API_TARGET` in a local `.env` file.

## Production

Build with:

```bash
npm run build
```

Deploy the generated `dist` directory as a static site.

If the frontend and API use the same public domain through a reverse proxy, no frontend API environment variable is needed: requests use `/api` automatically. If the API is hosted separately, configure this build-time variable in the frontend host and redeploy:

```env
VITE_API_URL=https://api.example.com/api
```

### Vercel frontend with a Render API

In **Vercel → Project Settings → Environment Variables**, add the following for the Production environment (and Preview if applicable), then redeploy the frontend:

```env
VITE_API_URL=https://YOUR-RENDER-SERVICE.onrender.com/api
```

Use the exact public URL of the Render web service. Do not use `/api` by itself when Vercel and Render are separate deployments, and do not add a trailing slash.

`VITE_*` values are public and embedded into the browser bundle. Never place MongoDB URIs, admin keys, or other secrets in a frontend environment variable.

Because the application uses `BrowserRouter`, configure the static host to rewrite unknown non-file routes (for example `/products/...` and `/admin/...`) to `index.html`. Keep `/api/*` routed to the backend when both applications share a domain.