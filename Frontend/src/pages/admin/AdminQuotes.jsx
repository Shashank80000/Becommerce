import { Fragment, useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import Loader from "../../components/common/Loader";
import QuoteAttachment from "../../components/admin/QuoteAttachment";
import { getQuotes, setQuoteStatus } from "../../services/adminApi";
import { QUOTE_STATUSES, statusLabel } from "./quoteStatus";

const PAGE_SIZE = 20;

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 0, total: 0 });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null);

  // Wait for a pause in typing before asking the server.
  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(id);
  }, [searchInput]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getQuotes({ page, limit: PAGE_SIZE, status, search });
      setQuotes(response.data);
      setPagination(response.pagination);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, [page, status, search]);

  useEffect(() => {
    load();
  }, [load]);

  const changeStatus = async (quote, next) => {
    const previous = quote.status;
    setQuotes((list) =>
      list.map((item) => (item._id === quote._id ? { ...item, status: next } : item)),
    );
    try {
      await setQuoteStatus(quote._id, next);
    } catch (saveError) {
      setQuotes((list) =>
        list.map((item) =>
          item._id === quote._id ? { ...item, status: previous } : item,
        ),
      );
      setError(`Couldn't update ${quote.quoteId}: ${saveError.message}`);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">Sales pipeline</p>
          <h1>Quote Requests</h1>
        </div>
      </div>
      <div className="admin-toolbar">
        <label className="admin-search">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search name, company, product or ID"
            aria-label="Search quote requests"
          />
        </label>
        <select
          className="status-select"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          {QUOTE_STATUSES.map((item) => (
            <option key={item} value={item}>
              {statusLabel(item)}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="admin-alert">{error}</div>}
      <section className="admin-panel">
        <div className="admin-table-wrap">
          {loading && !quotes.length ? (
            <div className="page-loader">
              <Loader />
            </div>
          ) : quotes.length ? (
            <table className={loading ? "is-loading" : ""}>
              <thead>
                <tr>
                  <th aria-label="Expand" />
                  <th>Request ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Attachment</th>
                  <th>Location</th>
                  <th>Received</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => {
                  const open = expanded === quote._id;
                  return (
                    <Fragment key={quote._id}>
                      <tr className={open ? "is-open" : ""}>
                        <td>
                          <button
                            type="button"
                            className="row-toggle"
                            onClick={() => setExpanded(open ? null : quote._id)}
                            aria-expanded={open}
                            aria-label={`${open ? "Hide" : "Show"} details for ${quote.quoteId}`}
                          >
                            {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </button>
                        </td>
                        <td className="mono">{quote.quoteId}</td>
                        <td>
                          {quote.name}
                          <small>{quote.companyName}</small>
                        </td>
                        <td>{quote.productName}</td>
                        <td>
                          <QuoteAttachment quote={quote} compact />
                        </td>
                        <td>{quote.deliveryLocation}</td>
                        <td>{new Date(quote.createdAt).toLocaleDateString()}</td>
                        <td>
                          <select
                            className={`status-select status-${quote.status.toLowerCase()}`}
                            value={quote.status}
                            onChange={(event) => changeStatus(quote, event.target.value)}
                            aria-label={`Status for ${quote.quoteId}`}
                          >
                            {QUOTE_STATUSES.map((item) => (
                              <option key={item} value={item}>
                                {statusLabel(item)}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      {open && (
                        <tr className="quote-details-row">
                          <td />
                          <td colSpan={7}>
                            <dl className="quote-details">
                              <div>
                                <dt>Phone</dt>
                                <dd>
                                  <a href={`tel:${quote.phone}`}>{quote.phone}</a>
                                </dd>
                              </div>
                              <div>
                                <dt>Email</dt>
                                <dd>
                                  {quote.email ? (
                                    <a href={`mailto:${quote.email}`}>{quote.email}</a>
                                  ) : (
                                    "—"
                                  )}
                                </dd>
                              </div>
                              <div>
                                <dt>Business type</dt>
                                <dd>{quote.businessType || "—"}</dd>
                              </div>
                              <div>
                                <dt>Received</dt>
                                <dd>{new Date(quote.createdAt).toLocaleString()}</dd>
                              </div>
                              <div className="wide">
                                <dt>Additional requirements</dt>
                                <dd className="pre">{quote.message || "—"}</dd>
                              </div>
                              <div className="wide">
                                <dt>Attachment</dt>
                                <dd>
                                  <QuoteAttachment quote={quote} />
                                </dd>
                              </div>
                            </dl>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="admin-empty">
              {search || status
                ? "No quote requests match these filters."
                : "No quote requests submitted yet."}
            </div>
          )}
        </div>
        {pagination.pages > 1 && (
          <div className="admin-pagination">
            <button
              type="button"
              onClick={() => setPage((current) => current - 1)}
              disabled={page <= 1 || loading}
            >
              ← Previous
            </button>
            <span>
              Page {pagination.page} of {pagination.pages} · {pagination.total} requests
            </span>
            <button
              type="button"
              onClick={() => setPage((current) => current + 1)}
              disabled={page >= pagination.pages || loading}
            >
              Next →
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
