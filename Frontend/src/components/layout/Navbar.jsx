import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import NavSearch from "./NavSearch";

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
          <NavSearch className="nav-search-desktop" />
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
          <NavSearch onNavigate={() => setOpen(false)} />
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
