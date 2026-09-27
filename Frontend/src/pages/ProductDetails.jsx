import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import { products } from "../utils/constants";
export default function ProductDetails() {
  const { id } = useParams();
  const product =
    products.find((item) => String(item.id) === id) || products[0];
  return (
    <section className="page container detail">
      <Link to="/products" className="back-link">
        ← Back to products
      </Link>
      <div className="detail-grid">
        <div className={`detail-art art-${product.color}`}>
          <span>{product.category}</span>
        </div>
        <div>
          <p className="eyebrow">{product.badge}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">
            {product.price} <small>/ {product.unit}</small>
          </p>
          <p className="detail-copy">
            A dependable, business-ready product selected for consistent
            performance and straightforward reordering.
          </p>
          <Button to="/request-quote">Ask about this product</Button>
        </div>
      </div>
    </section>
  );
}
