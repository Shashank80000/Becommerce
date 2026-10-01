import { Link } from "react-router-dom";
import { memo } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { categoryColor, tint } from "../../utils/colors";

// Memoised so filtering the catalogue only renders cards that changed.
export default memo(function ProductCard({ product }) {
  return (
    <article className="product-card" style={tint(categoryColor(product.category))}>
      <Link to={`/product/${product.slug}`} className="product-image">
        <img
          src={product.image}
          alt={product.name}
          width="700"
          height="520"
          loading="lazy"
          decoding="async"
        />
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
});
