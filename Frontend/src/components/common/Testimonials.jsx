import { testimonials } from "../../utils/siteContent";
import DevPlaceholder from "./DevPlaceholder";

export default function Testimonials() {
  if (!testimonials.length)
    return (
      <section className="section container">
        <DevPlaceholder>
          Customer quotes appear here. Add real ones (with permission) to
          <code> testimonials</code> in src/utils/siteContent.js. Hidden on the
          live site until then.
        </DevPlaceholder>
      </section>
    );

  return (
    <section className="section container">
      <p className="eyebrow">In their words</p>
      <h2>
        From the people
        <br />
        <em>we supply.</em>
      </h2>
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <figure className="testimonial" key={item.name}>
            <blockquote>“{item.quote}”</blockquote>
            <figcaption>
              <strong>{item.name}</strong>
              <span>
                {[item.role, item.company].filter(Boolean).join(", ")}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
