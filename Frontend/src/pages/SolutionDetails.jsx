import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import { solutions } from "../utils/constants";
export default function SolutionDetails() {
  const { slug } = useParams();
  const solution = solutions.find((item) => item.slug === slug) || solutions[0];
  return (
    <section className="page container solution-detail">
      <Link to="/solutions" className="back-link">
        ← All solutions
      </Link>
      <p className="eyebrow">Solution {solution.icon}</p>
      <h1>
        {solution.title}
        <br />
        <em>without the friction.</em>
      </h1>
      <p className="lead">
        {solution.description} We help your team spend less time chasing quotes
        and more time moving work forward.
      </p>
      <Button to="/request-quote">Talk to our team</Button>
      <div className="detail-points">
        <div>
          <strong>01</strong>
          <h3>Reliable availability</h3>
          <p>Know what is available and when it will arrive.</p>
        </div>
        <div>
          <strong>02</strong>
          <h3>One clear partner</h3>
          <p>Consolidate everyday sourcing in one simple workflow.</p>
        </div>
        <div>
          <strong>03</strong>
          <h3>Built to repeat</h3>
          <p>Make recurring orders easier for everyone involved.</p>
        </div>
      </div>
    </section>
  );
}
