import { randomBytes } from "node:crypto";

// No 0/O or 1/I, so IDs read back cleanly over the phone.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

// Random rather than sequential: sequential IDs collide when two quotes arrive
// at once and let anyone guess other customers' quote numbers.
export function generateQuoteId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = [...randomBytes(6)]
    .map((byte) => ALPHABET[byte % ALPHABET.length])
    .join("");
  return `QT-${date}-${suffix}`;
}
