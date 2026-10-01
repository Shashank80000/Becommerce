import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FileText, Paperclip, X } from "lucide-react";
import Input from "../common/Input";
import Button from "../common/Button";
import { getProducts } from "../../utils/storage";
import { submitQuote } from "../../services/quoteApi";
import { business } from "../../utils/siteContent";

const initial = {
  name: "",
  company: "",
  phone: "",
  email: "",
  product: "",
  location: "",
  businessType: "Factory",
  requirements: "",
};
// Must match MAX_PDF_BYTES in Backend/middleware/uploadMiddleware.js.
const MAX_PDF_BYTES = 10 * 1024 * 1024;

const formatSize = (bytes) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${Number((bytes / (1024 * 1024)).toFixed(1))} MB`;

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
  const [pdf, setPdf] = useState(null);
  const [pdfError, setPdfError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef(null);
  const update = (key, value) => setForm({ ...form, [key]: value });

  const choosePdf = (file) => {
    setPdfError("");
    if (!file) return;
    const isPdf =
      file.type === "application/pdf" || /\.pdf$/i.test(file.name);
    if (!isPdf) return setPdfError("Only PDF files can be attached.");
    if (file.size > MAX_PDF_BYTES)
      return setPdfError(
        `This PDF is ${formatSize(file.size)}. The limit is ${formatSize(MAX_PDF_BYTES)}.`,
      );
    setPdf(file);
  };

  const removePdf = () => {
    setPdf(null);
    setPdfError("");
    if (fileInput.current) fileInput.current.value = "";
  };

  const send = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setLoading(true);
    try {
      const selected = products.find((item) => item.name === form.product);
      const result = await submitQuote(
        {
          name: form.name,
          companyName: form.company,
          phone: form.phone,
          email: form.email,
          product: form.product,
          productSlug: selected?.slug,
          deliveryLocation: form.location,
          businessType: form.businessType,
          message: form.requirements,
        },
        pdf,
      );
      setSent({ ...result, firstName: form.name.trim().split(/\s+/)[0], phone: form.phone, email: form.email });
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (sent)
    return (
      <div className="success">
        <span>✓</span>
        <h2>Thanks, {sent.firstName}. We’ve got it.</h2>
        <p>
          Your reference is <strong>{sent.quoteId}</strong>
          {sent.attachment && <> · {sent.attachment.filename} attached</>}.
        </p>
        <ol className="next-steps">
          <li>Someone from our sales team reads your request {business.responseTime}.</li>
          <li>
            We’ll call you on <strong>{sent.phone}</strong> if anything needs
            checking.
          </li>
          <li>
            You get a written quote{sent.email ? <> at <strong>{sent.email}</strong></> : ""}. No obligation.
          </li>
        </ol>
        <div className="success-actions">
          <Link className="text-button" to="/products">
            Keep browsing
          </Link>
          <button
            className="clear-button"
            onClick={() => {
              setSent(null);
              setForm(initial);
              removePdf();
            }}
          >
            Send another request
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
      <div className="field requirements-field">
        <label htmlFor="quote-requirements" className="field-label">
          Additional Requirements
        </label>
        <textarea
          id="quote-requirements"
          rows="4"
          value={form.requirements}
          onChange={(event) => update("requirements", event.target.value)}
          placeholder="e.g. 200 L a month for 3 sites, delivered on Mondays"
        />
        {pdf ? (
          <div className="pdf-attached">
            <FileText size={20} aria-hidden="true" />
            <div>
              <strong>{pdf.name}</strong>
              <small>{formatSize(pdf.size)}</small>
            </div>
            <button
              type="button"
              onClick={removePdf}
              aria-label={`Remove ${pdf.name}`}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label
            className={`pdf-drop${dragging ? " is-dragging" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              choosePdf(event.dataTransfer.files[0]);
            }}
          >
            <input
              ref={fileInput}
              type="file"
              accept="application/pdf,.pdf"
              onChange={(event) => choosePdf(event.target.files[0])}
            />
            <Paperclip size={18} aria-hidden="true" />
            <div>
              <strong>Attach a PDF</strong>
              <small>
                Spec sheet, tender or product list · PDF up to{" "}
                {formatSize(MAX_PDF_BYTES)}
              </small>
            </div>
          </label>
        )}
        {pdfError && (
          <small className="field-error" role="alert">
            {pdfError}
          </small>
        )}
      </div>
      {bulk && (
        <p className="form-note">
          Ordering for several sites, or every month? Mention it and we’ll set
          up regular deliveries and pricing to match.
        </p>
      )}
      {submitError && (
        <p className="field-error" role="alert">
          {submitError}
        </p>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? "Sending…" : "Send my request"}
      </Button>
    </form>
  );
}
