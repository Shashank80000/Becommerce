import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="page centered-page">
      <p className="eyebrow">404</p>
      <h1>
        Page not
        <br />
        <em>found.</em>
      </h1>
      <p className="lead">
        The page you requested does not exist or has moved.
      </p>
      <Link className="button button-dark" to="/">
        Go Home ↗
      </Link>{" "}
      <Link className="text-button" to="/products">
        View Products
      </Link>
    </section>
  );
}
