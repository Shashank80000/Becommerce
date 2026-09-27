import { Link } from "react-router-dom";
import { solutions } from "../utils/constants";
export default function Solutions() {
  return (
    <section className="page container">
      <div className="page-intro">
        <p className="eyebrow">Solutions</p>
        <h1>
          Supply that fits
          <br />
          <em>the way you work.</em>
        </h1>
        <p>
          Different teams, different pressures. Our sourcing support adapts to
          the way your business operates.
        </p>
      </div>
      <div className="solution-grid">
        {solutions.map((item) => (
          <Link
            to={`/solutions/${item.slug}`}
            className="solution-card"
            key={item.slug}
          >
            <span className="solution-number">{item.icon}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <b>Explore solution ↗</b>
          </Link>
        ))}
      </div>
    </section>
  );
}
