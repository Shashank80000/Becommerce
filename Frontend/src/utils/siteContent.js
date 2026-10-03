// Everything about the real business lives here: who you are, how to reach
// you, and the people customers deal with. Pages read from this file, so
// filling it in updates the whole site.
//
// Anything left empty ("" or []) is simply not shown on the live site. During
// development (npm run dev) empty people/testimonial slots show as dashed
// placeholders so you can see where they will appear.

export const business = {
  name: "CleanWiper",
  // Shown in the footer and on the contact page. Leave "" to hide.
  phone: "+91 85950 88789",
  phoneHref: "+918595088789", // digits only, for tel: links
  whatsapp: "918595088789", // TODO: country code + number, no "+" or spaces
  email: "hello@becommerce.co", // TODO: real inbox
  address: "", // e.g. "Plot 12, Sector 63, Noida, UP 201301". Adds a map when set.
  // Opening hours. Used for the "open now" line, so set timeZone to where the
  // team works (e.g. "Asia/Kolkata", "Europe/London"); "" hides that line.
  hours: { label: "Mon–Fri, 8am–6pm", days: [1, 2, 3, 4, 5], open: 8, close: 18 },
  timeZone: "",
  // How fast someone really calls back. Keep it honest.
  responseTime: "within one working day",
  social: {
    linkedin: "", // full URLs; empty ones are hidden
    instagram: "",
  },
};

// A short note from whoever started the business, in their own words.
// Leave text "" to hide the section.
export const founderNote = {
  name: "",
  role: "Founder",
  photo: "", // e.g. "/team/priya.jpg" (put the file in Frontend/public/team/)
  text: "",
};

// The people customers actually talk to. A real face and first name does more
// than any slogan. Leave the list empty to hide the section.
export const team = [
  // { name: "Priya Shah", role: "Sales & quotes", photo: "/team/priya.jpg", note: "Ask me about bulk pricing and delivery schedules." },
];

// Who replies to quote requests. Shown beside the quote form.
// Leave name "" to show a generic team card instead.
export const quoteContact = {
  name: "",
  role: "Sales team",
  photo: "",
};

// Only real customers, with their permission. Leave empty to hide.
export const testimonials = [
  // { quote: "...", name: "Rahul Verma", role: "Facilities Manager", company: "Lotus Hotels" },
];
