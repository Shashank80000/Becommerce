const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

// Use a relative URL by default so production can serve the frontend and API
// behind the same domain. Set VITE_API_URL for a separately hosted API.
export const API_URL = configuredApiUrl
  ? configuredApiUrl.replace(/\/+$/, "")
  : "/api";

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
