import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/product/ProductGrid";
import ProductFilter from "../components/product/ProductFilter";
import ProductSearch from "../components/product/ProductSearch";
import EmptyState from "../components/common/EmptyState";
import { getProducts } from "../utils/storage";
import { categories, applications, packSizes } from "../utils/mockData";

const normalize = (value) =>
  value.toLowerCase().replaceAll("-", " ").replace(/s$/, "").trim();

export default function ProductsB2B() {
  const { category } = useParams();
  const products = getProducts();
  const matchedCategory = category
    ? categories.find((item) => normalize(item) === normalize(category))
    : null;
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    category: matchedCategory || (category ? "__invalid__" : "All"),
    application: "All",
    packSize: "All",
  });
  const [sort, setSort] = useState("Popular");
  const shown = useMemo(() => {
    const result = products.filter((product) => {
      const text =
        `${product.name} ${product.category} ${product.application} ${product.description}`.toLowerCase();
      return (
        text.includes(query.toLowerCase()) &&
        (filters.category === "All" || product.category === filters.category) &&
        (filters.application === "All" ||
          product.applications.includes(filters.application)) &&
        (filters.packSize === "All" || product.sizes.includes(filters.packSize))
      );
    });
    return [...result].sort((a, b) =>
      sort === "Name A-Z"
        ? a.name.localeCompare(b.name)
        : sort === "Name Z-A"
          ? b.name.localeCompare(a.name)
          : sort === "Newest"
            ? b.createdAt.localeCompare(a.createdAt)
            : b.popularity.localeCompare(a.popularity),
    );
  }, [products, query, filters, sort]);
  return (
    <section className="page catalogue-page container">
      <div className="page-intro">
        <p className="eyebrow">Product catalogue</p>
        <h1>
          Professional products
          <br />
          <em>for serious work.</em>
        </h1>
        <p>
          Commercial-grade cleaning chemicals, hygiene essentials, and tools
          supplied in business-ready pack sizes.
        </p>
      </div>
      <div className="catalogue-layout">
        <aside>
          <ProductFilter
            filters={filters}
            setFilters={setFilters}
            options={{ categories, applications, packSizes }}
          />
        </aside>
        <div className="catalogue-results">
          <div className="catalogue-toolbar">
            <ProductSearch value={query} onChange={setQuery} />
            <select
              className="sort-select"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option>Popular</option>
              <option>Name A-Z</option>
              <option>Name Z-A</option>
              <option>Newest</option>
            </select>
          </div>
          <div className="result-count">{shown.length} products found</div>
          {shown.length ? (
            <ProductGrid products={shown} />
          ) : (
            <EmptyState
              title={category ? "Category not found" : "No products found"}
              message={
                category
                  ? "This category is not available in the catalogue."
                  : "Try adjusting your search or filters."
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
