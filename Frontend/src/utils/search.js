import { getProducts } from "./storage";
import { categories, solutions } from "./mockData";

export const categorySlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// "Cleaners" should find "Cleaner", so drop a trailing plural "s".
const stem = (word) => (word.length > 3 ? word.replace(/e?s$/, "") : word);

const terms = (query) =>
  query.toLowerCase().split(/\s+/).filter(Boolean).map(stem);

const join = (...parts) => parts.flat().filter(Boolean).join(" ").toLowerCase();

export const productText = (product) =>
  join(
    product.name,
    product.category,
    product.application,
    product.applications,
    product.description,
    product.sizes,
    product.features,
    product.specifications,
  );

const solutionText = (solution) =>
  join(
    solution.name,
    solution.title,
    solution.description,
    solution.requirements,
    solution.benefits,
  );

// Every word in the query must appear somewhere in the text.
export function matchesQuery(text, query) {
  const words = terms(query);
  return words.every((word) => text.includes(word));
}

// Rank name hits above matches buried in descriptions or specs.
const rank = (name, query) => {
  const lower = name.toLowerCase();
  const words = terms(query);
  if (lower.startsWith(words[0])) return 0;
  if (words.every((word) => lower.includes(word))) return 1;
  return 2;
};
const byRank = (query) => (a, b) => rank(a.name, query) - rank(b.name, query);

export function searchCatalogue(query, limits = {}) {
  const empty = { categories: [], products: [], solutions: [] };
  if (!query.trim()) return empty;
  const products = getProducts();

  const matchedCategories = categories
    .filter((name) => matchesQuery(name.toLowerCase(), query))
    .map((name) => ({
      name,
      slug: categorySlug(name),
      count: products.filter((product) => product.category === name).length,
    }));

  const matchedProducts = products
    .filter((product) => matchesQuery(productText(product), query))
    .sort(byRank(query));

  const matchedSolutions = solutions
    .filter((solution) => matchesQuery(solutionText(solution), query))
    .sort(byRank(query));

  return {
    categories: matchedCategories.slice(0, limits.categories ?? Infinity),
    products: matchedProducts.slice(0, limits.products ?? Infinity),
    solutions: matchedSolutions.slice(0, limits.solutions ?? Infinity),
    totalProducts: matchedProducts.length,
  };
}
