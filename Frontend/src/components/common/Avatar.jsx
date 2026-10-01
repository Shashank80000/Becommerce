const initials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "B";

export default function Avatar({ name, photo, size = 56 }) {
  return photo ? (
    <img className="avatar" src={photo} alt="" width={size} height={size} loading="lazy" />
  ) : (
    <span className="avatar avatar-initials" style={{ width: size, height: size, fontSize: size * 0.36 }} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
