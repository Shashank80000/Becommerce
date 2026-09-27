import { products as seedProducts } from "./mockData";

const PRODUCTS_KEY = "becommerce_products";
const QUOTES_KEY = "becommerce_quote_requests";

export function getProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
    return Array.isArray(saved) ? saved : seedProducts;
  } catch {
    return seedProducts;
  }
}
export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return products;
}
export function getQuoteRequests() {
  try {
    const saved = JSON.parse(localStorage.getItem(QUOTES_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}
export function saveQuoteRequest(request) {
  const requests = getQuoteRequests();
  const saved = {
    ...request,
    id:
      request.id ||
      `QT-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    date: request.date || new Date().toISOString(),
    status: request.status || "New",
  };
  localStorage.setItem(QUOTES_KEY, JSON.stringify([saved, ...requests]));
  return saved;
}
export function updateQuoteStatus(id, status) {
  const requests = getQuoteRequests().map((request) =>
    request.id === id ? { ...request, status } : request,
  );
  localStorage.setItem(QUOTES_KEY, JSON.stringify(requests));
  return requests;
}
export function removeProduct(id) {
  return saveProducts(
    getProducts().filter((product) => product.id !== Number(id)),
  );
}
