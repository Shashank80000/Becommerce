export default function ProductFilter({ filters, setFilters, options }) {
  return (
    <div className="filter-panel">
      <label>
        Category
        <select
          value={filters.category}
          onChange={(event) =>
            setFilters({ ...filters, category: event.target.value })
          }
        >
          <option>All</option>
          {options.categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label>
        Application
        <select
          value={filters.application}
          onChange={(event) =>
            setFilters({ ...filters, application: event.target.value })
          }
        >
          <option>All</option>
          {options.applications.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label>
        Pack size
        <select
          value={filters.packSize}
          onChange={(event) =>
            setFilters({ ...filters, packSize: event.target.value })
          }
        >
          <option>All</option>
          {options.packSizes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <button
        className="clear-button"
        onClick={() =>
          setFilters({ category: "All", application: "All", packSize: "All" })
        }
      >
        Clear Filters
      </button>
    </div>
  );
}
