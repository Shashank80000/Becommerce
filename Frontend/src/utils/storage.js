import { products as seedProducts } from "./mockData";

const PRODUCTS_KEY = "becommerce_products";

// Parse once per stored value: callers get the same array back until the data
// changes, which keeps their useMemo dependencies stable between renders.
let productsCache = { raw: undefined, value: seedProducts };

export function getProducts() {
  let raw = null;
  try {
    raw = localStorage.getItem(PRODUCTS_KEY);
  } catch {
    return seedProducts;
  }
  if (raw === productsCache.raw) return productsCache.value;
  let value = seedProducts;
  try {
    const saved = JSON.parse(raw);
    if (Array.isArray(saved)) value = saved;
  } catch {
    // fall back to the seed catalogue
  }
  productsCache = { raw, value };
  return value;
}
export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return products;
}
export function removeProduct(id) {
  return saveProducts(
    getProducts().filter((product) => product.id !== Number(id)),
  );
}
