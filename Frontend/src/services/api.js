const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

const defaultApiUrl = import.meta.env.PROD
  ? "https://becommerce-q6hw.onrender.com/api"
  : "/api";

export const API_URL = configuredApiUrl
  ? configuredApiUrl.replace(/\/+$/, "")
  : defaultApiUrl;

export async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }
  return data;
}
