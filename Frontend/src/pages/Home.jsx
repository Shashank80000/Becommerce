import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import ProductGrid from "../components/product/ProductGrid";
import { products, solutions } from "../utils/constants";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Business procurement, simplified</p>
            <h1>
              Source smarter.
              <br />
              <em>Build better.</em>
            </h1>
            <p className="hero-copy">
              The reliable supply partner for teams that need quality products,
              honest pricing, and delivery that keeps up.
            </p>
            <Button to="/products">Explore products</Button>
          </div>
          <div className="hero-visual">
            <div className="visual-card">
              <span className="visual-tag">Trusted supply</span>
              <strong>
                Everything
                <br />
                in one place.
              </strong>
              <span className="visual-line" />
            </div>
            <div className="visual-note">
              01{" "}
              <span>
                From one-off orders
                <br />
                to recurring supply.
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-head">
          <div>
            <p className="eyebrow">The essentials, ready</p>
            <h2>
              Products that work
              <br />
              as hard as you do.
            </h2>
          </div>
          <Link to="/products" className="text-link">
            View catalogue ↗
          </Link>
        </div>
        <ProductGrid products={products.slice(0, 3)} />
      </section>
      <section className="band">
        <div className="container split">
          <div>
            <p className="eyebrow">Built around your business</p>
            <h2>
              Procurement should feel
              <br />
              <em>straightforward.</em>
            </h2>
          </div>
          <div className="feature-list">
            {solutions.map((item) => (
              <Link
                to={`/solutions/${item.slug}`}
                className="feature"
                key={item.slug}
              >
                <span>{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <b>↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
