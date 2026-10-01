import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="page centered-page">
      <p className="eyebrow">404</p>
      <h1>
        Hmm, this page
        <br />
        <em>has gone missing.</em>
      </h1>
      <p className="lead">
        It may have moved, or the link has a typo. Sorry about that.
        Try the products, or tell us what you were looking for.
      </p>
      <Link className="button button-dark" to="/products">
        Browse products ↗
      </Link>{" "}
      <Link className="text-button" to="/contact">
        Ask us instead
      </Link>
    </section>
  );
}
