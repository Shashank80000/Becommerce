import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Check, ChevronRight } from "lucide-react";
import Button from "../components/common/Button";
import WhatsAppButton from "../components/common/WhatsAppButton";
import ProductGrid from "../components/product/ProductGrid";
import EmptyState from "../components/common/EmptyState";
import { getProducts } from "../utils/storage";
export default function ProductDetailsB2B() {
  const { slug } = useParams();
  const products = getProducts();
  const product = products.find((item) => item.slug === slug);
  useEffect(() => {
    if (product) document.title = `${product.name} | B.Ecommerce`;
  }, [product]);
  if (!product)
    return (
      <EmptyState
        title="Product not found"
        message="This product is no longer in the catalogue."
      />
    );
  const related = products.filter((item) => product.related?.includes(item.id));
  return (
    <section className="page product-detail-page container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products">Products</Link>
        <ChevronRight size={14} />
        <span>{product.name}</span>
      </div>
      <div className="product-detail-grid">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-copy-panel">
          <p className="eyebrow">
            {product.category} · {product.application}
          </p>
          <h1>{product.name}</h1>
          <p className="lead">{product.description}</p>
          <div className="detail-block">
            <span>Available pack sizes</span>
            <div className="size-pills">
              {product.sizes.map((size) => (
                <b key={size}>{size}</b>
              ))}
            </div>
          </div>
          <div className="detail-actions">
            <Button to={`/request-quote?product=${product.slug}`}>
              Request Quote
            </Button>
            <WhatsAppButton product={product} />
          </div>
        </div>
      </div>
      <div className="product-information">
        <div>
          <h2>Description</h2>
          <p>
            {product.description} Designed for demanding professional
            environments where repeatable results and dependable replenishment
            matter.
          </p>
        </div>
        <div>
          <h2>Applications</h2>
          <ul className="check-list">
            {product.applications.map((item) => (
              <li key={item}>
                <Check size={16} /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Features</h2>
          <ul className="plain-list">
            {product.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Specifications</h2>
          <ul className="plain-list">
            {product.specifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Usage Instructions</h2>
          <p>{product.usage}</p>
        </div>
        <div>
          <h2>Safety Information</h2>
          <p>{product.safety}</p>
        </div>
      </div>
      {related.length > 0 && (
        <div className="related-products">
          <div className="section-heading">
            <h2>Related products</h2>
            <Link to="/products" className="text-button">
              View catalogue ↗
            </Link>
          </div>
          <ProductGrid products={related} />
        </div>
      )}
    </section>
  );
}
