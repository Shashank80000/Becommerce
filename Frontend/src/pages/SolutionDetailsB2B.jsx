import { Link, useParams } from "react-router-dom";
import { Check, ArrowUpRight } from "lucide-react";
import Button from "../components/common/Button";
import ProductGrid from "../components/product/ProductGrid";
import { solutions } from "../utils/mockData";

const solutionAliases = {
  factories: "factory",
  offices: "office",
  hotels: "hotel",
  hospitals: "hospital",
  restaurants: "restaurant",
  schools: "school",
  warehouses: "warehouse",
  "commercial-buildings": "commercial-building",
};

export default function SolutionDetailsB2B() {
  const { slug } = useParams();
  const solution = solutions.find(
    (item) => item.slug === slug || item.slug === solutionAliases[slug],
  );
  if (!solution)
    return (
      <section className="page centered-page">
        <h1>Solution not found.</h1>
        <Link to="/solutions" className="button button-dark">
          View Solutions ↗
        </Link>
      </section>
    );
  return (
    <section className="page solution-detail-page">
      <div className="container">
        <Link className="back-link" to="/solutions">
          ← All solutions
        </Link>
        <div className="solution-hero">
          <div>
            <p className="eyebrow">Industry solution · 0{solution.index + 1}</p>
            <h1>{solution.title}</h1>
            <p className="lead">{solution.description}</p>
            <Button to={`/request-quote?industry=${solution.name}`}>
              Request {solution.name} Cleaning Quote <ArrowUpRight size={16} />
            </Button>
          </div>
          <div className="solution-hero-art">
            <span>
              BUILT FOR
              <br />
              <em>the everyday.</em>
            </span>
          </div>
        </div>
        <div className="solution-sections">
          <div>
            <p className="eyebrow">The essentials</p>
            <h2>
              Common cleaning
              <br />
              <em>requirements</em>
            </h2>
          </div>
          <div className="requirement-list">
            {solution.requirements.map((item) => (
              <div key={item}>
                <Check size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="recommended">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A considered starting point</p>
              <h2>Recommended products</h2>
            </div>
          </div>
          <ProductGrid
            products={
              solution.recommended.length
                ? solution.recommended
                : solution.requirements
                    .slice(0, 3)
                    .map(
                      (_, index) =>
                        solution.recommended[
                          index % solution.recommended.length
                        ],
                    )
                    .filter(Boolean)
            }
          />
        </div>
        <div className="kit-band">
          <div>
            <p className="eyebrow">Recommended cleaning kit</p>
            <h2>
              A practical
              <br />
              <em>starting kit.</em>
            </h2>
          </div>
          <ol>
            <li>Daily surface cleaner and disinfectant</li>
            <li>Floor care concentrate for scheduled maintenance</li>
            <li>Washroom cleaner and hand hygiene essentials</li>
            <li>Tools, bags, and replenishment supplies</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
