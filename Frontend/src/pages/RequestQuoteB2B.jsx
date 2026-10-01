import QuoteForm from "../components/quote/QuoteForm";
import ContactPerson from "../components/common/ContactPerson";
import { business } from "../utils/siteContent";

export default function RequestQuoteB2B() {
  return (
    <section className="page container request-page">
      <div>
        <p className="eyebrow">Ask for a price</p>
        <h1>
          Tell us what
          <br />
          <em>you need.</em>
        </h1>
        <p className="lead">
          What you’re cleaning, where, and roughly how much. Rough is fine.
          We’ll ask follow-up questions if we need to.
        </p>
        <div className="request-points">
          <span>✓ No obligation</span>
          <span>✓ Prices for your volume</span>
          <span>✓ We reply {business.responseTime}</span>
        </div>
        <ContactPerson intro="Your request goes to" />
      </div>
      <QuoteForm />
    </section>
  );
}
