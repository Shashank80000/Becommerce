import { Link } from "react-router-dom";
import WhatsAppButton from "../common/WhatsAppButton";
import OpenStatus from "../common/OpenStatus";
import { business } from "../../utils/siteContent";

export default function Footer() {
  const socials = [
    ["LinkedIn", business.social.linkedin],
    ["Instagram", business.social.instagram],
  ].filter(([, url]) => url);

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark">B</span>
            <span>{business.name}</span>
          </Link>
          <p className="muted">
            Cleaning supplies for businesses,
            <br />
            and real people to help you choose.
          </p>
          <WhatsAppButton />
        </div>
        <div>
          <p className="footer-label">Company</p>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/bulk-orders">Bulk orders</Link>
          <Link to="/request-quote">Ask for a price</Link>
        </div>
        <div>
          <p className="footer-label">Products</p>
          <Link to="/products">All products</Link>
          <Link to="/solutions">By industry</Link>
        </div>
        <div>
          <p className="footer-label">Talk to us</p>
          {business.email && <a href={`mailto:${business.email}`}>{business.email}</a>}
          {business.phone && <a href={`tel:${business.phoneHref}`}>{business.phone}</a>}
          <p className="muted">
            {business.address && (
              <>
                {business.address}
                <br />
              </>
            )}
            {business.hours.label}
          </p>
          <OpenStatus />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {business.name}
        </span>
        {socials.length > 0 && (
          <span className="footer-social">
            {socials.map(([label, url]) => (
              <a key={label} href={url} target="_blank" rel="noreferrer">
                {label}
              </a>
            ))}
          </span>
        )}
      </div>
    </footer>
  );
}
