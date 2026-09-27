import { useState } from "react";
import { Plus } from "lucide-react";
export default function FAQ({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="faq">
      {items.map(([question, answer], index) => (
        <div className="faq-item" key={question}>
          <button onClick={() => setOpen(open === index ? null : index)}>
            <span>{question}</span>
            <Plus size={18} className={open === index ? "rotate" : ""} />
          </button>
          {open === index && <p>{answer}</p>}
        </div>
      ))}
    </div>
  );
}
