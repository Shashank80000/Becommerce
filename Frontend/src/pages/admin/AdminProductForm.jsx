import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/common/Input";
import { saveProduct } from "../../services/productApi";
import {
  getAdminCategories,
  getAdminProducts,
  getAdminToken,
  createAdminCategory,
  uploadProductImage,
} from "../../services/adminApi";
const blank = {
  name: "",
  category: "",
  description: "",
  application: "Factory",
  sizes: "5L, 20L",
  features: "Professional concentrate\nConsistent batch quality",
  specifications: "For commercial use\nStore in a cool, dry area",
  image: "https://placehold.co/700x520/d7e5df/17322c?text=Cleaning+Product",
  status: "Active",
};
const MAX_IMAGE_BYTES = 20 * 1024 * 1024;

function dataUrlToFile(dataUrl, name = "product-image") {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/data:(.*?);base64/)?.[1] || "image/jpeg";
  const bytes = Uint8Array.from(atob(base64), (character) =>
    character.charCodeAt(0),
  );
  return new File([bytes], name, { type: mime });
}

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [existing, setExisting] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(blank);
  const [imageError, setImageError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(form.image);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    Promise.all([getAdminCategories(), id ? getAdminProducts() : Promise.resolve([])])
      .then(([loadedCategories, loadedProducts]) => {
        setCategories(loadedCategories.filter((category) => category.isActive));
        const found = loadedProducts.find((product) => product._id === id);
        if (!found) return;
        setExisting(found);
        const image = found.images?.[0]?.url || "";
        setForm({
          ...found,
          category: found.category?._id || found.category,
          application: found.applications?.join(", ") || "",
          sizes: found.packSizes?.join(", ") || "",
          features: (found.features || []).join("\n"),
          specifications: Object.values(found.specifications || {}).join("\n"),
          image,
        });
        setImagePreview(image);
      })
      .catch((loadError) => setImageError(loadError.message));
  }, [id]);
  const update = (key, value) => setForm({ ...form, [key]: value });
  const createCategory = async (event) => {
    event.preventDefault();
    const name = newCategoryName.trim();
    if (!name) {
      setCategoryError("Enter a category name.");
      return;
    }

    setCreatingCategory(true);
    setCategoryError("");
    try {
      const category = await createAdminCategory(name);
      setCategories((current) =>
        [...current, category].sort((left, right) =>
          left.name.localeCompare(right.name),
        ),
      );
      update("category", category._id);
      setNewCategoryName("");
    } catch (error) {
      setCategoryError(error.message);
    } finally {
      setCreatingCategory(false);
    }
  };
  const selectImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const hasImageType =
      file.type?.startsWith("image/") ||
      /\.(jpe?g|png|gif|webp|bmp|svg|avif|heic|heif)$/i.test(file.name);

    if (!hasImageType) {
      setImageError("Please choose an image file.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setImageError("Image must be 20 MB or smaller.");
      event.target.value = "";
      return;
    }
    setImageError("");
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  useEffect(
    () => () => {
      if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    },
    [imagePreview],
  );
  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setImageError("");
    try {
      const imageFile =
        selectedImage ||
        (form.image.startsWith("data:")
          ? dataUrlToFile(form.image)
          : null);
      const image = imageFile
        ? (await uploadProductImage(imageFile)).url
        : form.image;
      await saveProduct({
        ...form,
        images: image ? [{ url: image }] : [],
        category: form.category,
        packSizes: form.sizes.split(",").map((item) => item.trim()).filter(Boolean),
        applications: form.application.split(",").map((item) => item.trim()).filter(Boolean),
        id: existing?._id,
        features: form.features.split("\n").filter(Boolean),
        specifications: Object.fromEntries(
          form.specifications.split("\n").filter(Boolean).map((item, index) => [`item${index + 1}`, item]),
        ),
      }, getAdminToken());
      navigate("/admin/products");
    } catch (error) {
      setImageError(error.message);
    } finally {
      setSaving(false);
    }
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
          <div>
            <label className="field">
              <span>Category</span>
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((item) => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                ))}
              </select>
            </label>
            <div className="form-inline">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="New category name"
                aria-label="New category name"
              />
              <button
                className="button button-light"
                type="button"
                onClick={createCategory}
                disabled={creatingCategory}
              >
                {creatingCategory ? "Adding..." : "Add category"}
              </button>
            </div>
            {categoryError && <p className="field-error">{categoryError}</p>}
          </div>
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
                accept="image/*,.jpg,.jpeg,.png,.webp,.gif,.bmp,.svg,.avif"
                onChange={selectImage}
              />
            </label>
            <p className="form-help">JPG, PNG, WEBP, or GIF up to 20 MB.</p>
            {imageError && <p className="field-error">{imageError}</p>}
          </div>
          <div className="product-image-preview">
            <span>Preview</span>
            <img src={imagePreview} alt="Product preview" />
          </div>
        </div>
        <Input
          label="Image URL (optional)"
          value={form.image.startsWith("data:") ? "" : form.image}
          onChange={(e) => {
            setSelectedImage(null);
            setImagePreview(e.target.value);
            update("image", e.target.value);
          }}
        />
        <button className="button button-dark" type="submit" disabled={saving}>
          {saving ? "Uploading..." : "Save Product ↗"}
        </button>
      </form>
    </div>
  );
}
