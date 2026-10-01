import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  type = "button",
  className = "",
  disabled,
}) {
  const classes = `button button-dark ${className}`;
  return to ? (
    <Link className={classes} to={to}>
      {children} <span>↗</span>
    </Link>
  ) : (
    <button className={classes} type={type} disabled={disabled}>
      {children} <span>↗</span>
    </button>
  );
}
