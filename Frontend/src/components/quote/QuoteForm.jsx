import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import { getProducts } from "../../utils/storage";
import { submitQuote } from "../../services/quoteApi";

const initial = {
  name: "",
  company: "",
  phone: "",
  email: "",
  product: "",
  quantity: "",
  unit: "Cases",
  location: "",
  businessType: "Factory",
  requirements: "",
};
const businessTypes = [
  "Factory",
  "Office",
  "Hotel",
  "Hospital",
  "Restaurant",
  "School",
  "Warehouse",
  "Other",
];

export default function QuoteForm({ bulk = false }) {
  const [params] = useSearchParams();
  const products = getProducts();
  const preselected = products.find(
    (item) => item.slug === params.get("product"),
  );
  const industry = params.get("industry");
  const [form, setForm] = useState({
    ...initial,
    product: preselected?.name || "",
    businessType: industry || "Factory",
  });
  const [sent, setSent] = useState(null);
  const [loading, setLoading] = useState(false);
  const update = (key, value) => setForm({ ...form, [key]: value });
  const send = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(submitQuote(form));
      setLoading(false);
    }, 450);
  };
  if (sent)
    return (
      <div className="success">
        <span>✓</span>
        <h2>Quote Request Submitted</h2>
        <p>
          Your request ID is: <strong>{sent.id}</strong>
        </p>
        <p>Your sales team can contact you shortly.</p>
        <div className="success-actions">
          <Link className="text-button" to="/products">
            Back to Products
          </Link>
          <button
            className="clear-button"
            onClick={() => {
              setSent(null);
              setForm(initial);
            }}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  return (
    <form className="quote-form" onSubmit={send}>
      <div className="form-two">
        <Input
          label="Name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          required
        />
        <Input
          label="Company Name"
          value={form.company}
          onChange={(event) => update("company", event.target.value)}
          required
        />
      </div>
      <div className="form-two">
        <Input
          label="Phone"
          value={form.phone}
          onChange={(event) => update("phone", event.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
        />
      </div>
      <div className="form-two">
        <label className="field">
          <span>Product *</span>
          <select
            value={form.product}
            onChange={(event) => update("product", event.target.value)}
            required
          >
            <option value="">Select a product</option>
            {products.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <Input
          label="Quantity"
          type="number"
          min="1"
          value={form.quantity}
          onChange={(event) => update("quantity", event.target.value)}
          required
        />
      </div>
      <div className="form-two">
        <label className="field">
          <span>Unit *</span>
          <select
            value={form.unit}
            onChange={(event) => update("unit", event.target.value)}
          >
            <option>Cases</option>
            <option>Drums</option>
            <option>Pallets</option>
            <option>Pieces</option>
            <option>Bulk</option>
          </select>
        </label>
        <Input
          label="Delivery Location"
          value={form.location}
          onChange={(event) => update("location", event.target.value)}
          required
        />
      </div>
      <label className="field">
        <span>Business Type</span>
        <select
          value={form.businessType}
          onChange={(event) => update("businessType", event.target.value)}
        >
          {businessTypes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <Input
        label="Additional Requirements"
        textarea
        rows="4"
        value={form.requirements}
        onChange={(event) => update("requirements", event.target.value)}
      />
      {bulk && (
        <p className="form-note">
          Large recurring orders can include delivery coordination and
          customized pricing.
        </p>
      )}
      <Button type="submit">
        {loading ? "Submitting..." : "Request Bulk Quote"}
      </Button>
    </form>
  );
}
