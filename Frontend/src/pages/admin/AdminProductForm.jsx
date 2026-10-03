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
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
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
  const [imageError, setImageError] = useState("");
  const update = (key, value) => setForm({ ...form, [key]: value });
  const selectImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageError("Please choose an image file.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setImageError("Image must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setImageError("The image could not be read. Please try again.");
        return;
      }
      setImageError("");
      update("image", reader.result);
    };
    reader.onerror = () => setImageError("The image could not be read. Please try again.");
    reader.readAsDataURL(file);
  };
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
        <div className="form-two">
          <div>
            <label className="field">
              <span>Upload product image</span>
              <input
                type="file"
                accept="image/*"
                onChange={selectImage}
              />
            </label>
            <p className="form-help">JPG, PNG, WEBP, or GIF up to 5 MB.</p>
            {imageError && <p className="field-error">{imageError}</p>}
          </div>
          <div className="product-image-preview">
            <span>Preview</span>
            <img src={form.image} alt="Product preview" />
          </div>
        </div>
        <Input
          label="Image URL (optional)"
          value={form.image.startsWith("data:") ? "" : form.image}
          onChange={(e) => update("image", e.target.value)}
        />
        <button className="button button-dark" type="submit">
          Save Product ↗
        </button>
      </form>
    </div>
  );
}
