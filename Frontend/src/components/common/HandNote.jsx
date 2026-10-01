// A short handwritten-style note: used sparingly where a person is speaking.
export default function HandNote({ children, signature, className = "" }) {
  return (
    <figure className={`hand-note ${className}`}>
      <blockquote>{children}</blockquote>
      {signature && <figcaption>— {signature}</figcaption>}
    </figure>
  );
}
