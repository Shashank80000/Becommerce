import { Check, ShieldCheck, Truck, Users } from "lucide-react";
export default function AboutB2B() {
  return (
    <section className="page container about-page">
      <div className="page-intro">
        <p className="eyebrow">About B.Ecommerce</p>
        <h1>
          Professional supply
          <br />
          <em>without the noise.</em>
        </h1>
        <p>
          We help businesses keep their spaces, teams, and operations clean with
          dependable products and practical support.
        </p>
      </div>
      <div className="about-story">
        <div className="about-art">
          <span>
            QUALITY
            <br />
            <em>in every order.</em>
          </span>
        </div>
        <div>
          <p className="eyebrow">What we believe</p>
          <h2>
            Good supply is
            <br />
            <em>quietly essential.</em>
          </h2>
          <p>
            From a factory floor to a hotel lobby, clean environments depend on
            products that perform and arrive when expected. We supply the
            chemicals, hygiene essentials, and tools behind that work.
          </p>
          <div className="about-values">
            <span>
              <ShieldCheck size={19} />
              Quality commitment
            </span>
            <span>
              <Truck size={19} />
              Bulk capability
            </span>
            <span>
              <Users size={19} />
              Business support
            </span>
            <span>
              <Check size={19} />
              Clear, dependable service
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
