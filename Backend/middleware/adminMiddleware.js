import jwt from "jsonwebtoken";

export function requireAdmin(req, res, next) {
  const authorization = req.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(\S+)$/i);
  if (!process.env.JWT_SECRET || !match)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const payload = jwt.verify(match[1], process.env.JWT_SECRET);
    if (typeof payload !== "object" || payload.role !== "admin")
      return res.status(401).json({ success: false, message: "Unauthorized" });
  } catch {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired session" });
  }

  next();
}
