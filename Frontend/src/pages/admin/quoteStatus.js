export const QUOTE_STATUSES = ["NEW", "CONTACTED", "QUOTED", "CLOSED"];
export const statusLabel = (status = "") =>
  status.charAt(0) + status.slice(1).toLowerCase();
