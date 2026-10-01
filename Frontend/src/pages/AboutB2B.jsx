import { Link } from "react-router-dom";
import { ArrowUpRight, Check, MessageCircle, Package, Truck } from "lucide-react";
import Avatar from "../components/common/Avatar";
import DevPlaceholder from "../components/common/DevPlaceholder";
import HandNote from "../components/common/HandNote";
import { business, founderNote, team } from "../utils/siteContent";
import { colorAt, tint } from "../utils/colors";

const promises = [
  [MessageCircle, "We listen first", "We ask what you’re cleaning and how often before we suggest a single product."],
  [Package, "No guesswork on sizes", "Every product lists its real pack sizes, from a 1L bottle to a 50L drum."],
  [Truck, "Orders that just turn up", "Regular orders get set up once and arrive on the schedule you choose."],
  [Check, "Straight answers", "If something isn’t right for the job, we’ll say so, and find what is."],
];

export default function AboutB2B() {
  return (
    <section className="page container about-page">
      <div className="page-intro">
        <p className="eyebrow">About us</p>
        <h1>
          Hi, we’re
          <br />
          <em>{business.name}.</em>
        </h1>
        <p>
          We supply cleaning chemicals, hygiene essentials and tools to
          businesses, and we try to make buying them easy: clear pack sizes,
          straight answers on price, and a real person when you call.
        </p>
      </div>

      {founderNote.text ? (
        <div className="founder-note">
          <Avatar name={founderNote.name} photo={founderNote.photo} size={88} />
          <div>
            <p className="eyebrow">Why we started</p>
            <HandNote signature={[founderNote.name, founderNote.role].filter(Boolean).join(", ")}>
              {founderNote.text}
            </HandNote>
          </div>
        </div>
      ) : (
        <DevPlaceholder>
          A short note from the founder goes here: why you started, in your
          own words. Fill in <code>founderNote</code> in
          src/utils/siteContent.js.
        </DevPlaceholder>
      )}

      <div className="about-story">
        <div className="about-art">
          <span>
            CLEAN SPACES
            <br />
            <em>need good supply.</em>
          </span>
        </div>
        <div>
          <p className="eyebrow">What you can expect</p>
          <h2>
            The little things
            <br />
            <em>we get right.</em>
          </h2>
          <p>
            From a factory floor to a hotel lobby, clean spaces depend on
            products that work and arrive when you need them. That’s our whole
            job, and these are the things we hold ourselves to.
          </p>
          <div className="promise-list">
            {promises.map(([Icon, title, text], index) => (
              <div key={title} style={tint(colorAt(index + 1))}>
                <Icon size={19} />
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="team-section">
        {(team.length > 0 || import.meta.env.DEV) && (
          <>
            <p className="eyebrow">The team</p>
            <h2>
              Who you’ll
              <br />
              <em>be talking to.</em>
            </h2>
          </>
        )}
        {team.length ? (
          <div className="team-grid">
            {team.map((person, index) => (
              <figure className="team-card" key={person.name} style={tint(colorAt(index))}>
                <Avatar name={person.name} photo={person.photo} size={96} />
                <figcaption>
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                  {person.note && <p>“{person.note}”</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <DevPlaceholder>
            Add the people customers deal with (a photo, first name, role and
            one line in their own words) to <code>team</code> in
            src/utils/siteContent.js. Real faces build trust faster than any
            slogan.
          </DevPlaceholder>
        )}
        <Link className="button button-dark" to="/contact">
          Say hello <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
