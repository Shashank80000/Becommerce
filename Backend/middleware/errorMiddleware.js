export function errorHandler(error, req, res, next) {
  let status = error.statusCode || 500;
  let message = error.message || "Something went wrong";
  let errors;
  if (error.name === "ValidationError") {
    status = 400;
    message = "Validation failed";
    errors = Object.values(error.errors).map((item) => item.message);
  }
  if (error.name === "CastError") {
    status = 400;
    message = "Invalid resource identifier";
  }
  if (error.code === 11000) {
    status = 409;
    message = `Duplicate value for ${Object.keys(error.keyValue).join(", ")}`;
  }
  const response = { success: false, message };
  if (errors) response.errors = errors;
  if (process.env.NODE_ENV !== "production") response.stack = error.stack;
  res.status(status).json(response);
}
