import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Package,
  BadgeIndianRupee,
  ShieldCheck,
  Headset,
  Check,
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
import Testimonials from "../components/common/Testimonials";
import { business } from "../utils/siteContent";
import { categoryColor, colorAt, industryColor, tint } from "../utils/colors";
import useReveal from "../hooks/useReveal";

// Each benefit takes a palette colour for its icon tile (see utils/palette.js).
const benefits = [
  { text: "Wide range of housekeeping products", Icon: Package, color: 6 },
  { text: "Prices that fit your volume", Icon: BadgeIndianRupee, color: 1 },
  { text: "Same product, every order", Icon: ShieldCheck, color: 2 },
  { text: "A real person to call", Icon: Headset, color: 3 },
];
// Staggers items that reveal together (see [data-reveal] in index.css).
const stagger = (index) => ({ "--i": index });
import { getProducts } from "../services/productApi";
import { categories, faqs, industries } from "../utils/mockData";
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
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then(setProducts).catch(() => setProducts([]));
  }, []);
  const revealRef = useReveal();
  return (
    <div ref={revealRef}>
      <section className="hero hero-b2b">
        <div className="container hero-b2b-grid">
          <div className="hero-enter">
            <p className="eyebrow">Cleaning supplies for businesses</p>
            <h1>
              You keep it clean.{" "}
              <em>We’ll keep you stocked.</em>
            </h1>
            <p className="hero-copy">
              Cleaning chemicals, hygiene essentials and tools for factories,
              offices, hotels, hospitals and kitchens. Tell us what you clean
              and how often, and we’ll put together an order that fits.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" to="/products">
                See the products <ArrowUpRight size={17} />
              </Link>
              <Link className="button button-light" to="/request-quote">
                Ask for a price <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="hero-proof">
              <span>
                <Check size={15} /> We reply {business.responseTime}
              </span>
              <span>
                <Check size={15} /> One case or a full pallet
              </span>
            </div>
          </div>
        </div>
        {/* Product photo bleeds off the right edge and fades into the copy. */}
        <div className="hero-photo" aria-hidden="true">
          <img src="/hero-cleaning.jpg" alt="" fetchPriority="high" />
        </div>
      </section>
      <section className="benefits" aria-label="Why order from us">
        <div className="container benefit-grid">
          {benefits.map(({ text, Icon, color }) => (
            <div className="benefit" key={text} style={tint(colorAt(color))}>
              <Icon size={22} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="section container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Start here</p>
            <h2>
              What are you <em>cleaning?</em>
            </h2>
          </div>
          <Link to="/products" className="text-button">
            View all products <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="category-grid category-grid--home">
          {categories.slice(0, 8).map((category, index) => (
            <Link
              className="category-card"
              data-reveal
              to={`/products/${category.toLowerCase().replaceAll(" ", "-")}`}
              key={category}
              style={{ ...tint(categoryColor(category)), ...stagger(index) }}
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
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">A good place to start</p>
              <h2>
                The everyday
                <br />
                <em>essentials.</em>
              </h2>
            </div>
            <Link to="/products" className="text-button">
              Browse catalogue <ArrowUpRight size={15} />
            </Link>
          </div>
          <div data-reveal>
            <ProductGrid products={products.slice(0, 6)} />
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Who we work with</p>
            <h2>
              From factory floors
              <br />
              <em>to front desks.</em>
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
                data-reveal
                key={item}
                style={{ ...tint(industryColor(item)), ...stagger(index) }}
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
          <div data-reveal>
            <p className="eyebrow">How we work</p>
            <h2>
              Simple,
              <br />
              <em>and on your side.</em>
            </h2>
            <p className="dark-copy">
              Buying cleaning supplies shouldn’t take a meeting. Tell us what
              you need in plain words and we’ll sort out the rest.
            </p>
            <WhatsAppButton />
          </div>
          <div className="why-list">
            {[
              "We ask what you’re cleaning before we suggest anything",
              "Clear pack sizes and straight prices, no surprises on the invoice",
              "If a product isn’t working for you, we’ll find another",
              "Regular orders or several sites? We set it up once and keep it running",
            ].map((item, index) => (
              <div key={item} data-reveal style={{ ...tint(colorAt(index + 1)), ...stagger(index) }}>
                <span>0{index + 1}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
      <section className="section container faq-section">
        <div data-reveal>
          <p className="eyebrow">Questions people ask us</p>
          <h2>
            The quick
            <br />
            <em>answers.</em>
          </h2>
        </div>
        <div data-reveal style={stagger(2)}>
          <FAQ items={faqs} />
        </div>
      </section>
      <section className="cta-section">
        <div className="container cta-inner" data-reveal>
          <div>
            <p className="eyebrow">Whenever you’re ready</p>
            <h2>
              Tell us what you need.
              <br />
              <em>We’ll do the rest.</em>
            </h2>
          </div>
          <div>
            <p>
              It takes about two minutes. Someone from our team will get back
              to you {business.responseTime} with prices.
            </p>
            <Link className="button button-dark" to="/request-quote">
              Ask for a price <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
