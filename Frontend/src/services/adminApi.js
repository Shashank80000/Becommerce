const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function loginAdmin(apiKey) {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Invalid admin key");
  }

  return data;
}
