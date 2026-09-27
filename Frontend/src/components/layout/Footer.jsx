import { Link } from "react-router-dom";
import WhatsAppButton from "../common/WhatsAppButton";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark">B</span>
            <span>B.Ecommerce</span>
          </Link>
          <p className="muted">
            Professional cleaning products
            <br />
            for businesses and industries.
          </p>
          <WhatsAppButton />
        </div>
        <div>
          <p className="footer-label">Company</p>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/bulk-orders">Bulk Orders</Link>
          <Link to="/request-quote">Request Quote</Link>
        </div>
        <div>
          <p className="footer-label">Products</p>
          <Link to="/products">Product catalogue</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/admin">Admin demo</Link>
        </div>
        <div>
          <p className="footer-label">Contact</p>
          <a href="mailto:hello@becommerce.co">hello@becommerce.co</a>
          <a href="tel:+15551234567">+1 (555) 123-4567</a>
          <p className="muted">
            120 Commerce Way
            <br />
            Mon–Fri, 8am–6pm
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2025 B.Ecommerce</span>
        <span>LinkedIn · Instagram</span>
      </div>
    </footer>
  );
}
