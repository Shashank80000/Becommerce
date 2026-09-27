import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  ArrowLeft,
  LogOut,
} from "lucide-react";
export default function AdminSidebar({ onLogout }) {
  function handleLogout() {
    sessionStorage.removeItem("becommerce_admin_key");
    onLogout();
  }

  return (
    <aside className="admin-sidebar">
      <Link to="/admin" className="brand">
        <span className="brand-mark">B</span>
        <span>B.Ecommerce</span>
      </Link>
      <p className="admin-label">Operations</p>
      <NavLink end to="/admin">
        <LayoutDashboard size={17} /> Dashboard
      </NavLink>
      <NavLink to="/admin/products">
        <Package size={17} /> Products
      </NavLink>
      <NavLink to="/admin/quotes">
        <ClipboardList size={17} /> Quote Requests
      </NavLink>
      <Link className="admin-back" to="/">
        <ArrowLeft size={16} /> View website
      </Link>
      <button className="admin-logout" onClick={handleLogout}>
        <LogOut size={16} /> Sign out
      </button>
    </aside>
  );
}
