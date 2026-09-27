import { useState } from "react";
import ProductGrid from "../components/product/ProductGrid";
import ProductFilter from "../components/product/ProductFilter";
import ProductSearch from "../components/product/ProductSearch";
import { products } from "../utils/constants";

export default function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const shown = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section className="page container">
      <div className="page-intro">
        <p className="eyebrow">The catalogue</p>
        <h1>
          Good products.
          <br />
          <em>Clear choices.</em>
        </h1>
        <p>
          Browse the dependable essentials your operation relies on, with
          pricing built for business.
        </p>
      </div>
      <div className="catalogue-toolbar">
        <ProductSearch value={query} onChange={setQuery} />
        <ProductFilter value={category} onChange={setCategory} />
      </div>
      <ProductGrid products={shown} />
    </section>
  );
}
