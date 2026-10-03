import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Loader from "../components/common/Loader";
import { ADMIN_LOGOUT_EVENT } from "../services/adminApi";
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

// Public pages are small and are where visitors land, so they ship in the main
// bundle (no extra round trip or layout shift on first load). The admin area is
// split out so ordinary visitors never download it.
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("../pages/admin/AdminProducts"));
const AdminProductForm = lazy(() => import("../pages/admin/AdminProductForm"));
const AdminQuotes = lazy(() => import("../pages/admin/AdminQuotes"));
const AdminSidebar = lazy(() => import("../components/admin/AdminSidebar"));
const AdminLogin = lazy(() => import("../components/admin/AdminLogin"));

const SITE = "CleanWiper";
const titles = [
  [/^\/$/, "Industrial sourcing, made clear"],
  [/^\/products/, "Products"],
  [/^\/solutions/, "Industry Solutions"],
  [/^\/bulk-orders/, "Bulk Orders"],
  [/^\/request-quote/, "Request a Quote"],
  [/^\/about/, "About"],
  [/^\/contact/, "Contact"],
  [/^\/admin/, "Admin"],
];

const PageLoader = () => (
  <div className="page-loader">
    <Loader />
  </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Detail pages set a more specific title themselves after this runs.
    const match = titles.find(([pattern]) => pattern.test(pathname));
    const page = match ? match[1] : "Page not found";
    document.title = pathname === "/" ? `${SITE} | ${page}` : `${page} | ${SITE}`;
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
    () => Boolean(sessionStorage.getItem("becommerce_admin_token")),
  );

  // adminApi fires this when the server rejects the stored key.
  useEffect(() => {
    const signOut = () => setAuthenticated(false);
    window.addEventListener(ADMIN_LOGOUT_EVENT, signOut);
    return () => window.removeEventListener(ADMIN_LOGOUT_EVENT, signOut);
  }, []);

  if (!authenticated) {
    return (
      <Suspense fallback={<PageLoader />}>
        <ScrollToTop />
        <AdminLogin onAuthenticated={() => setAuthenticated(true)} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <div className="admin-layout">
        <AdminSidebar onLogout={() => setAuthenticated(false)} />
        <main className="admin-main">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </Suspense>
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
