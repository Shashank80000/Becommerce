import {
  saveQuoteRequest,
  getQuoteRequests,
  updateQuoteStatus,
} from "../utils/storage";
export function submitQuote(data) {
  return saveQuoteRequest(data);
}
export { getQuoteRequests, updateQuoteStatus };
