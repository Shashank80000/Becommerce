import Quote from "../models/Quote.js";

export async function generateQuoteId() {
  const prefix = `QT-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}`;
  const count = await Quote.countDocuments({
    quoteId: new RegExp(`^${prefix}`),
  });
  return `${prefix}-${String(count + 1).padStart(3, "0")}`;
}
