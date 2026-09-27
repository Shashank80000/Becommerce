import { SearchX } from "lucide-react";
export default function EmptyState({
  title = "Nothing found",
  message = "Try adjusting your search or filters.",
}) {
  return (
    <div className="empty-state">
      <SearchX size={30} />
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
