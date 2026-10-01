import { API_URL } from "./api";

// Sends the quote as multipart form data so an optional PDF can ride along.
export async function submitQuote(fields, file) {
  const body = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value != null && value !== "") body.append(key, value);
  });
  if (file) body.append("attachment", file);

  let response;
  try {
    response = await fetch(`${API_URL}/quotes`, { method: "POST", body });
  } catch {
    throw new Error(
      "We couldn't reach our server. Check your connection and try again.",
    );
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = data.errors?.length ? ` (${data.errors.join(", ")})` : "";
    throw new Error(
      (data.message || "We couldn't submit your request. Please try again.") + detail,
    );
  }
  return data.data;
}
