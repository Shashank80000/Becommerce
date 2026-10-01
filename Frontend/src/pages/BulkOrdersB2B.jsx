import { ArrowUpRight, Check } from "lucide-react";
import QuoteForm from "../components/quote/QuoteForm";
import { colorAt, tint } from "../utils/colors";
export default function BulkOrdersB2B() {
  return (
    <section className="page bulk-page container">
      <div className="bulk-hero">
        <div>
          <p className="eyebrow">Bulk & regular orders</p>
          <h1>
            Buying a lot?
            <br />
            <em>Let’s make it easy.</em>
          </h1>
          <p className="lead">
            For teams that can’t afford to run out. Better prices for bigger
            volumes, and deliveries that arrive when you need them, not when
            someone remembers to reorder.
          </p>
        </div>
        <div className="bulk-number">
          01
          <br />
          <span>
            From one case
            <br />
            to every site you run.
          </span>
        </div>
      </div>
      <div className="bulk-benefits">
        {[
          "Better prices as you order more",
          "Drums, pallets and bulk packs",
          "Everything on one order",
          "A named contact for your account",
          "Deliveries on a set schedule",
        ].map((item, index) => (
          <div key={item} style={tint(colorAt(index))}>
            <Check size={18} />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="bulk-form-grid">
        <div>
          <p className="eyebrow">Start with a rough idea</p>
          <h2>
            Tell us about
            <br />
            <em>your order.</em>
          </h2>
          <p className="muted">
            You don’t need exact numbers. Tell us roughly what you use now and
            we’ll come back with prices and a plan that fits.
          </p>
        </div>
        <QuoteForm bulk />
      </div>
    </section>
  );
}
