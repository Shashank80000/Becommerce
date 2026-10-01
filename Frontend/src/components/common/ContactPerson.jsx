import { Mail, Phone } from "lucide-react";
import Avatar from "./Avatar";
import OpenStatus from "./OpenStatus";
import { business, quoteContact } from "../../utils/siteContent";

// "Who you'll hear from" card beside the forms.
export default function ContactPerson({ intro = "You’ll hear back from" }) {
  const person = quoteContact.name ? quoteContact : null;
  return (
    <aside className="contact-person">
      <Avatar name={person?.name || business.name} photo={person?.photo} size={52} />
      <div>
        <small>{intro}</small>
        <strong>{person ? person.name : `The ${business.name} team`}</strong>
        <span>{person ? person.role : "Real people, not a bot"}</span>
        <OpenStatus />
        <div className="contact-person-links">
          {business.phone && (
            <a href={`tel:${business.phoneHref}`}>
              <Phone size={14} /> {business.phone}
            </a>
          )}
          {business.email && (
            <a href={`mailto:${business.email}`}>
              <Mail size={14} /> {business.email}
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
