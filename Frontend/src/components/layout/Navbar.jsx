import { Link, NavLink } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav-wrap">
      <nav className="nav container">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">B</span>
          <span>B.Ecommerce</span>
        </Link>
        <div className="nav-links">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/solutions">Solutions</NavLink>
          <NavLink to="/bulk-orders">Bulk Orders</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <div className="nav-tools">
          <Link
            to="/products"
            className="nav-search"
            aria-label="Search products"
          >
            <Search size={17} />
          </Link>
          <Link to="/request-quote" className="button button-dark nav-cta">
            Request Quote <span>↗</span>
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="mobile-menu container">
          <NavLink onClick={() => setOpen(false)} to="/products">
            Products
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="/solutions">
            Solutions
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="/bulk-orders">
            Bulk Orders
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="/about">
            About
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="/contact">
            Contact
          </NavLink>
          <Link
            onClick={() => setOpen(false)}
            className="button button-dark"
            to="/request-quote"
          >
            Request Quote ↗
          </Link>
        </div>
      )}
    </header>
  );
}
