import { useState } from "react";
import { getQuoteRequests, updateQuoteStatus } from "../../services/quoteApi";
export default function AdminQuotes() {
  const [quotes, setQuotes] = useState(getQuoteRequests());
  const change = (id, status) => setQuotes(updateQuoteStatus(id, status));
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">Sales pipeline</p>
          <h1>Quote Requests</h1>
        </div>
      </div>
      <section className="admin-panel">
        <div className="admin-table-wrap">
          {quotes.length ? (
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Customer</th>
                  <th>Company</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.company}</td>
                    <td>{item.product}</td>
                    <td>
                      {item.quantity} {item.unit}
                    </td>
                    <td>{item.location}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>
                      <select
                        className="status-select"
                        value={item.status}
                        onChange={(e) => change(item.id, e.target.value)}
                      >
                        {["New", "Contacted", "Quoted", "Closed"].map(
                          (status) => (
                            <option key={status}>{status}</option>
                          ),
                        )}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="admin-empty">No quote requests submitted yet.</div>
          )}
        </div>
      </section>
    </div>
  );
}
