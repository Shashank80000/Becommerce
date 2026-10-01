// Shows where real content will go, during development only. Production
// builds render nothing, so unfinished sections never reach customers.
export default function DevPlaceholder({ children }) {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="dev-placeholder" role="note">
      <strong>Add real content</strong>
      <span>{children}</span>
    </div>
  );
}
