import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, X, LayoutGrid, Building2 } from "lucide-react";
import { searchCatalogue } from "../../utils/search";

const LIMITS = { categories: 3, products: 5, solutions: 2 };
const GROUPS = [
  ["categories", "Categories"],
  ["products", "Products"],
  ["solutions", "Solutions"],
];

export default function NavSearch({ onNavigate, className = "" }) {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef(null);
  // Typing stays instant; the suggestion list catches up a frame later.
  const deferredQuery = useDeferredValue(query);

  // Mirror the catalogue's ?q= so the box shows what is being searched.
  useEffect(() => {
    setQuery(
      pathname.startsWith("/products")
        ? new URLSearchParams(search).get("q") || ""
        : "",
    );
    setOpen(false);
  }, [pathname, search]);

  useEffect(() => {
    const close = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // One flat list (for arrow-key navigation) tagged with its group.
  const { suggestions, totalProducts } = useMemo(() => {
    const found = searchCatalogue(deferredQuery, LIMITS);
    const items = [
      ...found.categories.map((category) => ({
        group: "categories",
        key: `c-${category.slug}`,
        to: `/products/${category.slug}`,
        label: category.name,
        detail: `${category.count} product${category.count === 1 ? "" : "s"}`,
      })),
      ...found.products.map((product) => ({
        group: "products",
        key: `p-${product.id}`,
        to: `/product/${product.slug}`,
        label: product.name,
        detail: product.category,
        image: product.image,
      })),
      ...found.solutions.map((solution) => ({
        group: "solutions",
        key: `s-${solution.slug}`,
        to: `/solutions/${solution.slug}`,
        label: solution.title || solution.name,
        detail: "Industry solution",
      })),
    ];
    return { suggestions: items, totalProducts: found.totalProducts };
  }, [deferredQuery]);

  const go = (to) => {
    setOpen(false);
    setActive(-1);
    onNavigate?.();
    navigate(to);
  };

  const submit = (event) => {
    event.preventDefault();
    if (active >= 0 && suggestions[active])
      return go(suggestions[active].to);
    const term = query.trim();
    go(term ? `/products?q=${encodeURIComponent(term)}` : "/products");
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") return setOpen(false);
    if (!suggestions.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
    }
  };

  const showList = open && query.trim();

  return (
    <div className={`nav-search-box ${className}`} ref={wrapRef}>
      <form role="search" onSubmit={submit}>
        <Search size={16} aria-hidden="true" />
        <input
          type="search"
          value={query}
          placeholder="Search products, categories..."
          aria-label="Search products"
          aria-autocomplete="list"
          aria-expanded={Boolean(showList)}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        {query && (
          <button
            type="button"
            className="nav-search-clear"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setActive(-1);
            }}
          >
            <X size={14} />
          </button>
        )}
      </form>
      {showList && (
        <ul className="nav-search-results" role="listbox">
          {suggestions.length ? (
            <>
              {GROUPS.map(([group, title]) => {
                const items = suggestions.filter((item) => item.group === group);
                if (!items.length) return null;
                return (
                  <li key={group} className="nav-search-group">
                    <p>{title}</p>
                    <ul>
                      {items.map((item) => {
                        const index = suggestions.indexOf(item);
                        return (
                          <li
                            key={item.key}
                            role="option"
                            aria-selected={index === active}
                          >
                            <button
                              type="button"
                              className={index === active ? "is-active" : ""}
                              onMouseEnter={() => setActive(index)}
                              onClick={() => go(item.to)}
                            >
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt=""
                                  width="36"
                                  height="36"
                                  loading="lazy"
                                  decoding="async"
                                />
                              ) : (
                                <span className="nav-search-icon">
                                  {group === "categories" ? (
                                    <LayoutGrid size={16} />
                                  ) : (
                                    <Building2 size={16} />
                                  )}
                                </span>
                              )}
                              <span>
                                {item.label}
                                <small>{item.detail}</small>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
              {totalProducts > 0 && (
                <li>
                  <button
                    type="button"
                    className="nav-search-all"
                    onClick={() =>
                      go(`/products?q=${encodeURIComponent(query.trim())}`)
                    }
                  >
                    See all {totalProducts} product{totalProducts === 1 ? "" : "s"} for “{query.trim()}” ↗
                  </button>
                </li>
              )}
            </>
          ) : (
            <li className="nav-search-empty">No products match “{query.trim()}”</li>
          )}
        </ul>
      )}
    </div>
  );
}
