import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductGrid from "../components/product/ProductGrid";
import ProductFilter from "../components/product/ProductFilter";
import ProductSearch from "../components/product/ProductSearch";
import EmptyState from "../components/common/EmptyState";
import ProductHeroScene from "../components/product/ProductHeroScene";
import { getProducts } from "../utils/storage";
import { categories, applications, packSizes } from "../utils/mockData";
import { matchesQuery, productText } from "../utils/search";

const normalize = (value) =>
  value.toLowerCase().replaceAll("-", " ").replace(/s$/, "").trim();

export default function ProductsB2B() {
  const { category } = useParams();
  const products = getProducts();
  const matchedCategory = category
    ? categories.find((item) => normalize(item) === normalize(category))
    : null;
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const setQuery = (value) =>
    setSearchParams(
      (params) => {
        if (value) params.set("q", value);
        else params.delete("q");
        return params;
      },
      { replace: true },
    );
  const categoryFilter = matchedCategory || (category ? "__invalid__" : "All");
  const [filters, setFilters] = useState({
    category: categoryFilter,
    application: "All",
    packSize: "All",
  });
  // The route is reused between categories, so follow the URL when it changes.
  useEffect(() => {
    setFilters((current) => ({ ...current, category: categoryFilter }));
  }, [categoryFilter]);
  const [sort, setSort] = useState("Popular");
  const shown = useMemo(() => {
    const result = products.filter((product) => {
      return (
        matchesQuery(productText(product), query) &&
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
            ? String(b.createdAt || "").localeCompare(String(a.createdAt || ""))
            : String(b.popularity || "").localeCompare(String(a.popularity || "")),
    );
  }, [products, query, filters, sort]);
  return (
    <section className="page catalogue-page container">
      <div className="catalogue-hero">
        <ProductHeroScene category={filters.category} />
        <div className="page-intro">
          <p className="eyebrow">
            Product catalogue
            {categories.includes(filters.category) && ` · ${filters.category}`}
          </p>
          <h1>
            Professional products
            <br />
            <em>for serious work.</em>
          </h1>
          <p>
            Everything we stock, in the sizes businesses actually buy. Can’t
            see what you need? Ask us. We can usually find it.
          </p>
        </div>
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
          <div className="result-count">{shown.length} product{shown.length === 1 ? "" : "s"} found</div>
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
