import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/common/Input";
import WhatsAppButton from "../components/common/WhatsAppButton";
import ContactPerson from "../components/common/ContactPerson";
import OpenStatus from "../components/common/OpenStatus";
import { sendContactMessage } from "../services/contactApi";
import { business } from "../utils/siteContent";

const blank = { name: "", email: "", phone: "", message: "" };

export default function ContactB2B() {
  const [form, setForm] = useState(blank);
  const [sentTo, setSentTo] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  const send = async (event) => {
    event.preventDefault();
    setError("");
    setSending(true);
    try {
      await sendContactMessage(form);
      setSentTo(form.name.trim().split(/\s+/)[0]);
      setForm(blank);
    } catch (sendError) {
      setError(
        sendError instanceof TypeError
          ? "We couldn’t reach our server. Check your connection, or call or WhatsApp us instead."
          : sendError.message,
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="page container contact-page">
      <div>
        <p className="eyebrow">Contact us</p>
        <h1>
          Say hello.
          <br />
          <em>A person will answer.</em>
        </h1>
        <p className="lead">
          A question about a product, a price, or an order that hasn’t turned
          up? Call, message or write. Whichever is easiest for you.
        </p>
        <div className="contact-details">
          {business.phone && (
            <a href={`tel:${business.phoneHref}`}>
              <Phone size={17} />
              <span>{business.phone}</span>
            </a>
          )}
          {business.email && (
            <a href={`mailto:${business.email}`}>
              <Mail size={17} />
              <span>{business.email}</span>
            </a>
          )}
          <WhatsAppButton />
          {business.address && (
            <div>
              <MapPin size={17} />
              <span>{business.address}</span>
            </div>
          )}
          <div>
            <Clock3 size={17} />
            <span>
              {business.hours.label}
              <OpenStatus className="open-status-block" />
            </span>
          </div>
        </div>
      </div>
      <div>
        {sentTo ? (
          <div className="success">
            <span>✓</span>
            <h2>Thanks{sentTo ? `, ${sentTo}` : ""}!</h2>
            <p>
              Your message is with our team. We’ll get back to you{" "}
              {business.responseTime}.
            </p>
            <p>
              Need a price? The <Link to="/request-quote">quote form</Link> is
              the quickest way.
            </p>
            <button className="clear-button" onClick={() => setSentTo("")}>
              Send another message
            </button>
          </div>
        ) : (
          <form className="quote-form" onSubmit={send}>
            <Input label="Your name" value={form.name} onChange={update("name")} required />
            <div className="form-two">
              <Input label="Email" type="email" value={form.email} onChange={update("email")} required />
              <Input label="Phone (optional)" value={form.phone} onChange={update("phone")} />
            </div>
            <Input
              label="Message"
              textarea
              rows="5"
              value={form.message}
              onChange={update("message")}
              placeholder="How can we help?"
              required
            />
            {error && (
              <p className="field-error" role="alert">
                {error}
              </p>
            )}
            <button className="button button-dark" type="submit" disabled={sending}>
              {sending ? "Sending…" : "Send message ↗"}
            </button>
          </form>
        )}
        <ContactPerson intro="You’ll hear back from" />
        {business.address && (
          <iframe
            className="contact-map"
            title={`Map showing ${business.address}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(business.address)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
    </section>
  );
}
