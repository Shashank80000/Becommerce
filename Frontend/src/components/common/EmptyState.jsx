import { SearchX } from "lucide-react";
import { Link } from "react-router-dom";
export default function EmptyState({
  title = "Nothing found",
  message = "Try adjusting your search or filters.",
  showAsk = true,
}) {
  return (
    <div className="empty-state">
      <SearchX size={30} />
      <h3>{title}</h3>
      <p>{message}</p>
      {showAsk && (
        <p className="empty-ask">
          Can’t see what you need? We often source products on request.{" "}
          <Link to="/request-quote">Just ask us</Link>.
        </p>
      )}
    </div>
  );
}
