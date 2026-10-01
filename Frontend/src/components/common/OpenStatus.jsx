import { business } from "../../utils/siteContent";

const formatHour = (hour) => {
  const suffix = hour >= 12 ? "pm" : "am";
  const value = hour % 12 || 12;
  return `${value}${suffix}`;
};

// "We're in until 6pm" / "We're back Monday at 8am", in the team's own time zone.
function status() {
  const { hours, timeZone } = business;
  if (!timeZone) return null;
  let parts;
  try {
    parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
      hour: "numeric",
      hourCycle: "h23",
    }).formatToParts(new Date());
  } catch {
    return null;
  }
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
  const workday = hours.days.includes(day);

  if (workday && hour >= hours.open && hour < hours.close)
    return { open: true, text: `We’re in now, until ${formatHour(hours.close)}` };
  if (workday && hour < hours.open)
    return { open: false, text: `We’re in from ${formatHour(hours.open)} today` };

  const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  for (let step = 1; step <= 7; step += 1) {
    const next = (day + step) % 7;
    if (hours.days.includes(next))
      return {
        open: false,
        text: `We’re back ${step === 1 ? "tomorrow" : names[next]} at ${formatHour(hours.open)}`,
      };
  }
  return null;
}

export default function OpenStatus({ className = "" }) {
  const current = status();
  if (!current) return null;
  return (
    <span className={`open-status ${current.open ? "is-open" : ""} ${className}`}>
      <span className="open-dot" aria-hidden="true" />
      {current.text}
    </span>
  );
}
