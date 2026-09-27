import { Link } from "react-router-dom";
import { Package, ClipboardList, Clock3, Building2 } from "lucide-react";
import { getProducts } from "../../utils/storage";
import { getQuoteRequests } from "../../services/quoteApi";
export default function AdminDashboard() {
  const products = getProducts();
  const quotes = getQuoteRequests();
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">Operations overview</p>
          <h1>Dashboard</h1>
        </div>
        <Link className="button button-dark" to="/admin/products/add">
          Add Product +
        </Link>
      </div>
      <div className="admin-stats">
        <div>
          <Package />
          <span>Total Products</span>
          <strong>{products.length}</strong>
        </div>
        <div>
          <ClipboardList />
          <span>Total Quote Requests</span>
          <strong>{quotes.length}</strong>
        </div>
        <div>
          <Clock3 />
          <span>Pending Quotes</span>
          <strong>
            {quotes.filter((item) => item.status === "New").length}
          </strong>
        </div>
        <div>
          <Building2 />
          <span>Industries Served</span>
          <strong>9</strong>
        </div>
      </div>
      <section className="admin-panel">
        <div className="panel-head">
          <h2>Recent Quote Requests</h2>
          <Link to="/admin/quotes">View all ↗</Link>
        </div>
        {quotes.length ? (
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {quotes.slice(0, 5).map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      {item.name}
                      <small>{item.company}</small>
                    </td>
                    <td>{item.product}</td>
                    <td>{item.location}</td>
                    <td>
                      <span
                        className={`status status-${item.status.toLowerCase()}`}
                      >
                        {item.status}
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
    </div>
  );
}
