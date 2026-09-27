import { Link } from "react-router-dom";
import { ArrowUpRight, MessageCircle } from "lucide-react";
export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-image">
        <img src={product.image} alt={product.name} />
        <span>{product.category}</span>
      </Link>
      <div className="product-info">
        <div className="product-meta">
          <span>{product.application}</span>
          <span>{product.sizes.join(" · ")}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-actions">
          <Link className="text-button" to={`/product/${product.slug}`}>
            View Product <ArrowUpRight size={15} />
          </Link>
          <Link
            className="icon-button"
            to={`/request-quote?product=${product.slug}`}
            aria-label={`Request quote for ${product.name}`}
          >
            <MessageCircle size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
