import { Search } from "lucide-react";
export default function ProductSearch({ value, onChange }) {
  return (
    <label className="search">
      <Search size={18} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products, categories, applications..."
      />
    </label>
  );
}
