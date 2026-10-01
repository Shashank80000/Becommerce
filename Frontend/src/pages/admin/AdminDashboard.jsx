import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ClipboardList, Clock3, FileText } from "lucide-react";
import Loader from "../../components/common/Loader";
import QuoteAttachment from "../../components/admin/QuoteAttachment";
import { getDashboard } from "../../services/adminApi";
import { statusLabel } from "./quoteStatus";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getDashboard()
      .then((response) => active && setStats(response.data))
      .catch((loadError) => active && setError(loadError.message));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">Operations overview</p>
          <h1>Dashboard</h1>
        </div>
        <Link className="button button-dark" to="/admin/quotes">
          All Quote Requests ↗
        </Link>
      </div>
      {error && <div className="admin-alert">{error}</div>}
      {!stats && !error && (
        <div className="page-loader">
          <Loader />
        </div>
      )}
      {stats && (
        <>
          <div className="admin-stats">
            <div>
              <Package />
              <span>Active Products</span>
              <strong>{stats.products}</strong>
            </div>
            <div>
              <ClipboardList />
              <span>Total Quote Requests</span>
              <strong>{stats.quotes}</strong>
            </div>
            <div>
              <Clock3 />
              <span>New (not contacted)</span>
              <strong>{stats.pendingQuotes}</strong>
            </div>
            <div>
              <FileText />
              <span>Quotes with PDF</span>
              <strong>{stats.quotesWithPdf}</strong>
            </div>
          </div>
          <section className="admin-panel">
            <div className="panel-head">
              <h2>Recent Quote Requests</h2>
              <Link to="/admin/quotes">View all ↗</Link>
            </div>
            {stats.recentQuotes.length ? (
              <div className="admin-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Attachment</th>
                      <th>Received</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentQuotes.map((quote) => (
                      <tr key={quote._id}>
                        <td className="mono">{quote.quoteId}</td>
                        <td>
                          {quote.name}
                          <small>{quote.companyName}</small>
                        </td>
                        <td>{quote.productName}</td>
                        <td>
                          <QuoteAttachment quote={quote} compact />
                        </td>
                        <td>{new Date(quote.createdAt).toLocaleDateString()}</td>
                        <td>
                          <span className={`status status-${quote.status.toLowerCase()}`}>
                            {statusLabel(quote.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="admin-empty">
                No quote requests yet. Submitted requests will appear here.
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
