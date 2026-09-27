import { Link } from "react-router-dom";
export default function MobileMenu() {
  return (
    <div className="mobile-menu">
      <Link to="/products">Products</Link>
      <Link to="/solutions">Solutions</Link>
      <Link to="/request-quote">Request a quote</Link>
    </div>
  );
}
