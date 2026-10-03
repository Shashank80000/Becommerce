import multer from "multer";

export const MAX_PDF_BYTES = 10 * 1024 * 1024;
export const MAX_IMAGE_BYTES = 20 * 1024 * 1024;

const pdfUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_PDF_BYTES, files: 1, fields: 20, fieldSize: 20 * 1024 },
  fileFilter(req, file, callback) {
    const looksLikePdf =
      file.mimetype === "application/pdf" || /\.pdf$/i.test(file.originalname);
    if (!looksLikePdf) {
      const error = new Error("Only PDF files can be attached");
      error.statusCode = 400;
      return callback(error);
    }
    callback(null, true);
  },
});

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMAGE_BYTES, files: 1, fields: 10 },
  fileFilter(req, file, callback) {
    const hasImageMime = file.mimetype && file.mimetype.startsWith("image/");
    const hasImageExtension = /\.(jpe?g|png|gif|webp|bmp|svg|avif|heic|heif)$/i.test(
      file.originalname,
    );

    if (!hasImageMime && !hasImageExtension) {
      const error = new Error("Only image files can be uploaded");
      error.statusCode = 400;
      return callback(error);
    }
    callback(null, true);
  },
});

export function productImageUpload(req, res, next) {
  imageUpload.single("image")(req, res, (error) => {
    if (!error) return next();
    if (error instanceof multer.MulterError) {
      const tooLarge = error.code === "LIMIT_FILE_SIZE";
      return res.status(tooLarge ? 413 : 400).json({
        success: false,
        message: tooLarge
          ? `Image must be ${MAX_IMAGE_BYTES / (1024 * 1024)} MB or smaller`
          : `Upload rejected: ${error.message}`,
      });
    }
    if (error.statusCode === 400)
      return res.status(400).json({ success: false, message: error.message });
    next(error);
  });
}

// Accepts an optional single PDF in the "attachment" field and turns multer's
// errors into the API's usual JSON error shape.
export function optionalPdf(fieldName = "attachment") {
  const handler = pdfUpload.single(fieldName);
  return (req, res, next) =>
    handler(req, res, (error) => {
      if (!error) {
        // The extension and mimetype are client-supplied; check the bytes.
        if (req.file && req.file.buffer.subarray(0, 5).toString() !== "%PDF-") {
          return res.status(400).json({
            success: false,
            message: "The attached file is not a valid PDF",
          });
        }
        return next();
      }
      if (error instanceof multer.MulterError) {
        const tooLarge = error.code === "LIMIT_FILE_SIZE";
        return res.status(tooLarge ? 413 : 400).json({
          success: false,
          message: tooLarge
            ? `PDF must be ${MAX_PDF_BYTES / (1024 * 1024)} MB or smaller`
            : `Upload rejected: ${error.message}`,
        });
      }
      if (error.statusCode === 400)
        return res.status(400).json({ success: false, message: error.message });
      next(error);
    });
}
