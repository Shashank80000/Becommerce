import QuoteForm from "../components/quote/QuoteForm";
export default function RequestQuote() {
  return (
    <section className="page container quote-page">
      <div>
        <p className="eyebrow">Let’s talk requirements</p>
        <h1>
          Tell us what
          <br />
          <em>you need.</em>
        </h1>
        <p className="lead">
          Share a few details and our team will come back with a clear, tailored
          quote.
        </p>
      </div>
      <QuoteForm />
    </section>
  );
}
