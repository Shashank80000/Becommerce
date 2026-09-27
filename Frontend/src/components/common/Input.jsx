export default function Input({ label, textarea = false, error, ...props }) {
  return (
    <label className="field">
      <span>
        {label}
        {props.required && " *"}
      </span>
      {textarea ? <textarea {...props} /> : <input {...props} />}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}
