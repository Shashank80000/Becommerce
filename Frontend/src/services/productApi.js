import {
  getProducts as readProducts,
  saveProducts,
  removeProduct,
} from "../utils/storage";

export async function getProducts() {
  return readProducts();
}
export async function saveProduct(product) {
  const products = readProducts();
  const saved = {
    ...product,
    id: product.id || Math.max(0, ...products.map((item) => item.id)) + 1,
    slug:
      product.slug ||
      product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
  };
  const next = product.id
    ? products.map((item) => (item.id === Number(product.id) ? saved : item))
    : [saved, ...products];
  saveProducts(next);
  return saved;
}
export async function deleteProduct(id) {
  return removeProduct(id);
}
