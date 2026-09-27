import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Home from "../pages/HomeB2B";
import Products from "../pages/ProductsB2B";
import ProductDetails from "../pages/ProductDetailsB2B";
import Solutions from "../pages/SolutionsB2B";
import SolutionDetails from "../pages/SolutionDetailsB2B";
import BulkOrders from "../pages/BulkOrdersB2B";
import RequestQuote from "../pages/RequestQuoteB2B";
import About from "../pages/AboutB2B";
import Contact from "../pages/ContactB2B";
import NotFound from "../pages/NotFound";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminProductForm from "../pages/admin/AdminProductForm";
import AdminQuotes from "../pages/admin/AdminQuotes";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminLogin from "../components/admin/AdminLogin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
function AdminLayout() {
  const [authenticated, setAuthenticated] = useState(
    () => Boolean(sessionStorage.getItem("becommerce_admin_key")),
  );

  if (!authenticated) {
    return <AdminLogin onAuthenticated={() => setAuthenticated(true)} />;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar onLogout={() => setAuthenticated(false)} />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/solutions/:slug" element={<SolutionDetails />} />
        <Route path="/bulk-orders" element={<BulkOrders />} />
        <Route path="/request-quote" element={<RequestQuote />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/add" element={<AdminProductForm />} />
        <Route path="products/edit/:id" element={<AdminProductForm />} />
        <Route path="quotes" element={<AdminQuotes />} />
      </Route>
    </Routes>
  );
}
