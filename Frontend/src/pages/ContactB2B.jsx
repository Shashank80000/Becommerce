import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import Input from "../components/common/Input";
import WhatsAppButton from "../components/common/WhatsAppButton";
export default function ContactB2B() {
  const [sent, setSent] = useState(false);
  return (
    <section className="page container contact-page">
      <div>
        <p className="eyebrow">Contact the team</p>
        <h1>
          Let’s make
          <br />
          <em>something work.</em>
        </h1>
        <p className="lead">
          Questions, product requests, or just want to talk supply? We’re here.
        </p>
        <div className="contact-details">
          <a href="tel:+15551234567">
            <Phone size={17} />
            <span>+1 (555) 123-4567</span>
          </a>
          <a href="mailto:hello@becommerce.co">
            <Mail size={17} />
            <span>hello@becommerce.co</span>
          </a>
          <WhatsAppButton />
          <div>
            <MapPin size={17} />
            <span>120 Commerce Way, Business District</span>
          </div>
          <div>
            <span>Mon–Fri, 8am–6pm</span>
          </div>
        </div>
      </div>
      <div>
        {sent ? (
          <div className="success">
            <h2>Message received.</h2>
            <p>
              Thanks for reaching out. A member of our team will reply shortly.
            </p>
          </div>
        ) : (
          <form
            className="quote-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <Input label="Name" required />
            <Input label="Email" type="email" required />
            <Input label="Phone" />
            <Input label="Message" textarea rows="5" required />
            <button className="button button-dark" type="submit">
              Send Message ↗
            </button>
          </form>
        )}
        <div className="map-placeholder">
          <MapPin size={25} />
          <span>
            Map area
            <br />
            <small>Business district, city center</small>
          </span>
        </div>
      </div>
    </section>
  );
}
