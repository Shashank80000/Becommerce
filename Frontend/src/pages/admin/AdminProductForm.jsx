import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/common/Input";
import { getProducts } from "../../utils/storage";
import { saveProduct } from "../../services/productApi";
const blank = {
  name: "",
  category: "Floor Cleaner",
  description: "",
  application: "Factory",
  sizes: "5L, 20L",
  features: "Professional concentrate\nConsistent batch quality",
  specifications: "For commercial use\nStore in a cool, dry area",
  image: "https://placehold.co/700x520/d7e5df/17322c?text=Cleaning+Product",
  status: "Active",
};
export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = getProducts().find((item) => item.id === Number(id));
  const [form, setForm] = useState(
    existing
      ? {
          ...existing,
          sizes: existing.sizes.join(", "),
          features: existing.features.join("\n"),
          specifications: existing.specifications.join("\n"),
        }
      : blank,
  );
  const update = (key, value) => setForm({ ...form, [key]: value });
  const save = (event) => {
    event.preventDefault();
    saveProduct({
      ...form,
      id: existing?.id,
      sizes: form.sizes.split(",").map((item) => item.trim()),
      applications: form.application.split(",").map((item) => item.trim()),
      features: form.features.split("\n").filter(Boolean),
      specifications: form.specifications.split("\n").filter(Boolean),
      related: [],
    });
    navigate("/admin/products");
  };
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">Catalogue management</p>
          <h1>{existing ? "Edit product" : "Add product"}</h1>
        </div>
      </div>
      <form className="admin-form" onSubmit={save}>
        <div className="form-two">
          <Input
            label="Product Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
          <label className="field">
            <span>Category</span>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            >
              {[
                "Floor Cleaner",
                "Toilet Cleaner",
                "Glass Cleaner",
                "Disinfectant",
                "Degreaser",
                "Surface Cleaner",
                "Laundry",
                "Kitchen",
                "Hygiene",
                "Cleaning Tools",
                "Garbage Bags",
                "Industrial Chemicals",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <Input
          label="Description"
          textarea
          rows="3"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          required
        />
        <div className="form-two">
          <Input
            label="Applications"
            value={form.application}
            onChange={(e) => update("application", e.target.value)}
          />
          <Input
            label="Pack Sizes (comma separated)"
            value={form.sizes}
            onChange={(e) => update("sizes", e.target.value)}
          />
        </div>
        <div className="form-two">
          <Input
            label="Price display"
            value={form.price || "Request a quote"}
            onChange={(e) => update("price", e.target.value)}
          />
          <label className="field">
            <span>Status</span>
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
            >
              <option>Active</option>
              <option>Draft</option>
            </select>
          </label>
        </div>
        <div className="form-two">
          <Input
            label="Features (one per line)"
            textarea
            rows="5"
            value={form.features}
            onChange={(e) => update("features", e.target.value)}
          />
          <Input
            label="Specifications (one per line)"
            textarea
            rows="5"
            value={form.specifications}
            onChange={(e) => update("specifications", e.target.value)}
          />
        </div>
        <Input
          label="Image URL"
          value={form.image}
          onChange={(e) => update("image", e.target.value)}
        />
        <button className="button button-dark" type="submit">
          Save Product ↗
        </button>
      </form>
    </div>
  );
}
