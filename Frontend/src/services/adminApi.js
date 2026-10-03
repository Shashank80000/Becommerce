import { API_URL } from "./api";

const TOKEN_STORAGE = "becommerce_admin_token";
export const ADMIN_LOGOUT_EVENT = "becommerce:admin-logout";

export const getAdminToken = () =>
  sessionStorage.getItem(TOKEN_STORAGE) || "";

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

  if (!data.token) {
    throw new Error(
      data.message ||
        "The server is using an old admin login API. Redeploy the backend.",
    );
  }
  sessionStorage.setItem(TOKEN_STORAGE, data.token);
  return data;
}

async function adminFetch(path, options = {}) {
  const token = getAdminToken();
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  if (options.body && !(options.body instanceof FormData))
    headers["Content-Type"] = "application/json";

  let response;
  try {
    response = await fetch(`${API_URL}/admin${path}`, { ...options, headers });
  } catch {
    throw new Error("Can't reach the server. Check your connection and try again.");
  }
  if (response.status === 401) {
    sessionStorage.removeItem(TOKEN_STORAGE);
    window.dispatchEvent(new Event(ADMIN_LOGOUT_EVENT));
    throw new Error("Your admin session has expired. Please sign in again.");
  }
  return response;
}

async function adminRequest(path, options) {
  const response = await adminFetch(path, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong.");
  return data;
}

export const getDashboard = () => adminRequest("/dashboard");

export const getQuotes = (params = {}) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== "" && value != null),
  );
  return adminRequest(`/quotes?${query}`);
};

export const setQuoteStatus = (id, status) =>
  adminRequest(`/quotes/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

// The download needs the admin header, so fetch the PDF and hand the browser a
// local object URL instead of linking to the API directly.
export async function openQuoteAttachment(quote, { inline = false } = {}) {
  // Open the tab now, inside the click, or popup blockers will stop it.
  const tab = inline ? window.open("", "_blank") : null;
  try {
    const response = await adminFetch(`/quotes/${quote._id}/attachment`);
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || "Couldn't download the PDF.");
    }
    const url = URL.createObjectURL(await response.blob());
    if (tab) {
      tab.location.href = url;
    } else {
      const link = document.createElement("a");
      link.href = url;
      link.download = quote.attachment?.filename || `${quote.quoteId}.pdf`;
      document.body.append(link);
      link.click();
      link.remove();
    }
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  } catch (error) {
    tab?.close();
    throw error;
  }
}
