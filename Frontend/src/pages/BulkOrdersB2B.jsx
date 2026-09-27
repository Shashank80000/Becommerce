import { ArrowUpRight, Check } from "lucide-react";
import QuoteForm from "../components/quote/QuoteForm";
export default function BulkOrdersB2B() {
  return (
    <section className="page bulk-page container">
      <div className="bulk-hero">
        <div>
          <p className="eyebrow">Bulk supply programs</p>
          <h1>
            Bulk cleaning
            <br />
            <em>product supply.</em>
          </h1>
          <p className="lead">
            Large quantities, customized pricing, and delivery coordination for
            businesses that cannot run out.
          </p>
        </div>
        <div className="bulk-number">
          01
          <br />
          <span>
            From regular cases
            <br />
            to full-site supply.
          </span>
        </div>
      </div>
      <div className="bulk-benefits">
        {[
          "Bulk pricing",
          "Large quantity supply",
          "Multiple product categories",
          "Business support",
          "Delivery coordination",
        ].map((item) => (
          <div key={item}>
            <Check size={18} />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="bulk-form-grid">
        <div>
          <p className="eyebrow">Start a conversation</p>
          <h2>
            Tell us about
            <br />
            <em>your order.</em>
          </h2>
          <p className="muted">
            Share your requirements and our sales team will come back with
            practical pricing and supply options.
          </p>
        </div>
        <QuoteForm bulk />
      </div>
    </section>
  );
}
