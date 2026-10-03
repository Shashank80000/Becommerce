import { API_URL, request } from "./api";

export async function getProducts() {
  const response = await request("/products?limit=100");
  return response.data.map(normalizeProduct);
}
export async function getProduct(slug) {
  const response = await request(`/products/${slug}`);
  return normalizeProduct(response.data);
}

export function normalizeProduct(product) {
  const category = product.category?.name || product.category || "";
  return {
    ...product,
    id: product._id || product.id,
    image: product.images?.[0]?.url || product.image || "",
    category,
    application: product.applications?.join(", ") || product.application || "",
    applications: product.applications || [],
    sizes: product.packSizes || product.sizes || [],
    features: product.features || [],
    specifications: Array.isArray(product.specifications)
      ? product.specifications
      : Object.entries(product.specifications || {}).map(
          ([key, value]) => `${key}: ${value}`,
        ),
    usage: product.usageInstructions || product.usage || "",
    safety: product.safetyInformation || product.safety || "",
  };
}

export const saveProduct = (product, token) => {
  const { id, _id, ...body } = product;
  return fetch(`${API_URL}/admin/products${id ? `/${id}` : ""}`, {
    method: product.id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  }).then(async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Could not save product.");
    return normalizeProduct(data.data);
  });
};
