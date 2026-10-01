import { request } from "./api";

export const sendContactMessage = (fields) =>
  request("/contact", { method: "POST", body: JSON.stringify(fields) });
