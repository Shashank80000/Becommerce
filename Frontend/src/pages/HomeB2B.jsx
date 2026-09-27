import { Link } from "react-router-dom";
import {
  Truck,
  BadgeDollarSign,
  ShieldCheck,
  Headset,
  Zap,
  ArrowUpRight,
  Factory,
  Building2,
  Hotel,
  Hospital,
  Utensils,
  GraduationCap,
  Warehouse,
  Store,
  ClipboardCheck,
} from "lucide-react";
import ProductGrid from "../components/product/ProductGrid";
import FAQ from "../components/common/FAQ";
import WhatsAppButton from "../components/common/WhatsAppButton";
import { getProducts } from "../utils/storage";
import { categories, faqs, industries } from "../utils/mockData";
const icons = [Truck, BadgeDollarSign, ShieldCheck, Headset, Zap];
const industryIcons = [
  Factory,
  Building2,
  Hotel,
  Hospital,
  Utensils,
  GraduationCap,
  Warehouse,
  Store,
  ClipboardCheck,
];
export default function HomeB2B() {
  const products = getProducts();
  return (
    <>
      <section className="hero hero-b2b">
        <div className="container hero-b2b-grid">
          <div>
            <p className="eyebrow">Professional supply partner</p>
            <h1>
              Professional Cleaning Products{" "}
              <em>for Businesses & Industries</em>
            </h1>
            <p className="hero-copy">
              Reliable bulk cleaning solutions for factories, offices, hotels,
              hospitals, restaurants, institutions, and commercial facilities.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" to="/products">
                Explore Products <ArrowUpRight size={17} />
              </Link>
              <Link className="button button-light" to="/request-quote">
                Request Bulk Quote <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="hero-proof">
              <span>✓ Trusted by facility teams</span>
              <span>✓ Bulk-ready supply</span>
            </div>
          </div>
          <div className="hero-visual clean-visual">
            <div className="clean-product">
              <span>01 / COMMERCIAL CARE</span>
              <strong>
                Clean
                <br />
                <em>with confidence.</em>
              </strong>
              <small>Concentrates · Hygiene · Tools</small>
            </div>
            <div className="visual-sticker">
              SUPPLY
              <br />
              MADE SIMPLE
            </div>
          </div>
        </div>
      </section>
      <section className="benefits">
        <div className="container benefit-grid">
          {[
            "Bulk Supply",
            "Competitive Pricing",
            "Reliable Quality",
            "Business Support",
            "Fast Delivery",
          ].map((item, index) => {
            const Icon = icons[index];
            return (
              <div className="benefit" key={item}>
                <Icon size={22} />
                <span>{item}</span>
              </div>
            );
          })}
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Shop by need</p>
            <h2>
              Everything your
              <br />
              <em>operation needs.</em>
            </h2>
          </div>
          <Link to="/products" className="text-button">
            View all products <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link
              className="category-card"
              to={`/products/${category}`}
              key={category}
            >
              <span>0{index + 1}</span>
              <strong>{category}</strong>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </section>
      <section className="section tinted">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Featured products</p>
              <h2>
                Reliable products.
                <br />
                <em>Ready to order.</em>
              </h2>
            </div>
            <Link to="/products" className="text-button">
              Browse catalogue <ArrowUpRight size={15} />
            </Link>
          </div>
          <ProductGrid products={products.slice(0, 6)} />
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Industries we serve</p>
            <h2>
              Built for the
              <br />
              <em>real world.</em>
            </h2>
          </div>
        </div>
        <div className="industry-grid">
          {industries.map((item, index) => {
            const Icon = industryIcons[index];
            return (
              <Link
                to={`/solutions/${item.toLowerCase().replaceAll(" ", "-")}`}
                className="industry-card"
                key={item}
              >
                <Icon size={22} />
                <strong>{item}</strong>
                <ArrowUpRight size={15} />
              </Link>
            );
          })}
        </div>
      </section>
      <section className="dark-section">
        <div className="container why-grid">
          <div>
            <p className="eyebrow">Why B.Ecommerce</p>
            <h2>
              A supply partner
              <br />
              <em>that gets it.</em>
            </h2>
            <p className="dark-copy">
              Professional cleaning is about consistency. We make it easier to
              maintain standards across every site, shift, and order.
            </p>
            <WhatsAppButton />
          </div>
          <div className="why-list">
            {[
              "Products selected for commercial performance",
              "Clear pack sizes and dependable availability",
              "One partner for everyday and specialist needs",
              "Support for recurring and multi-site supply",
            ].map((item, index) => (
              <div key={item}>
                <span>0{index + 1}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <p className="eyebrow">Questions, answered</p>
          <h2>
            Good to
            <br />
            <em>know.</em>
          </h2>
        </div>
        <FAQ items={faqs} />
      </section>
      <section className="cta-section">
        <div className="container cta-inner">
          <div>
            <p className="eyebrow">Ready when you are</p>
            <h2>
              Need cleaning products
              <br />
              in <em>large quantities?</em>
            </h2>
          </div>
          <div>
            <p>
              Get customized pricing and supply solutions for your business.
            </p>
            <Link className="button button-dark" to="/request-quote">
              Request Bulk Quote <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
