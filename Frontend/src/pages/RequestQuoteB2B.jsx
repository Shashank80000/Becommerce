import QuoteForm from "../components/quote/QuoteForm";
export default function RequestQuoteB2B() {
  return (
    <section className="page container request-page">
      <div>
        <p className="eyebrow">Talk to sales</p>
        <h1>
          Let’s build your
          <br />
          <em>supply plan.</em>
        </h1>
        <p className="lead">
          Tell us what you need, where you operate, and how often you buy. We’ll
          take it from there.
        </p>
        <div className="request-points">
          <span>✓ No obligation</span>
          <span>✓ Business pricing</span>
          <span>✓ Response within one business day</span>
        </div>
      </div>
      <QuoteForm />
    </section>
  );
}
