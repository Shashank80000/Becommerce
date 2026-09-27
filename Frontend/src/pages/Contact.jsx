import { Link } from "react-router-dom";
export default function Contact() {
  return (
    <section className="page container contact-page">
      <div>
        <p className="eyebrow">Contact</p>
        <h1>
          Let’s make
          <br />
          <em>something work.</em>
        </h1>
        <p className="lead">
          Questions, product requests, or just want to talk supply? We’re here.
        </p>
      </div>
      <div className="contact-info">
        <div>
          <span>Email</span>
          <a href="mailto:hello@becommerce.co">hello@becommerce.co</a>
        </div>
        <div>
          <span>Call</span>
          <a href="tel:+18005550142">+1 800 555 0142</a>
        </div>
        <div>
          <span>Need a quote?</span>
          <Link to="/request-quote">Start a request ↗</Link>
        </div>
      </div>
    </section>
  );
}
