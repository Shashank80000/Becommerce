export function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_API_KEY;
  const provided = req.get("x-admin-key");
  if (!expected || !provided || provided !== expected)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  next();
}
