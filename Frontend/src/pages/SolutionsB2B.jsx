import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Factory,
  Building2,
  Hotel,
  Hospital,
  Utensils,
  GraduationCap,
  Warehouse,
  Store,
  ClipboardCheck,
} from "lucide-react";
import { solutions } from "../utils/mockData";
const icons = [
  Factory,
  Building2,
  Hotel,
  Hospital,
  Utensils,
  GraduationCap,
  Warehouse,
  Store,
  ClipboardCheck,
];
export default function SolutionsB2B() {
  return (
    <section className="page container">
      <div className="page-intro">
        <p className="eyebrow">Industry solutions</p>
        <h1>
          Cleaning support
          <br />
          <em>by industry.</em>
        </h1>
        <p>
          Every environment has different standards, surfaces, and routines.
          Find a supply approach built for yours.
        </p>
      </div>
      <div className="solution-grid">
        {solutions.map((solution, index) => {
          const Icon = icons[index];
          return (
            <Link
              className="solution-card"
              to={`/solutions/${solution.slug}`}
              key={solution.slug}
            >
              <Icon size={25} />
              <span className="solution-index">0{index + 1}</span>
              <h2>{solution.name}</h2>
              <p>{solution.description}</p>
              <b>
                Explore solution <ArrowUpRight size={15} />
              </b>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
