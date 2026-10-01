import { useState } from "react";
import { Download, Eye, FileText } from "lucide-react";
import { openQuoteAttachment } from "../../services/adminApi";

const formatSize = (bytes = 0) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${Number((bytes / (1024 * 1024)).toFixed(1))} MB`;

export default function QuoteAttachment({ quote, compact = false }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  if (!quote.attachment) return <span className="muted">—</span>;

  const open = async (inline) => {
    setError("");
    setBusy(true);
    try {
      await openQuoteAttachment(quote, { inline });
    } catch (openError) {
      setError(openError.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="quote-attachment">
      <span className="quote-attachment-name" title={quote.attachment.filename}>
        <FileText size={15} aria-hidden="true" />
        <span>{quote.attachment.filename}</span>
        {!compact && <small>{formatSize(quote.attachment.size)}</small>}
      </span>
      <span className="quote-attachment-actions">
        <button type="button" onClick={() => open(true)} disabled={busy} title="View PDF">
          <Eye size={14} /> View
        </button>
        <button type="button" onClick={() => open(false)} disabled={busy} title="Download PDF">
          <Download size={14} /> {busy ? "…" : "Download"}
        </button>
      </span>
      {error && <small className="field-error">{error}</small>}
    </div>
  );
}
