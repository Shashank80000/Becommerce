import mongoose from "mongoose";

// Quote PDFs live in MongoDB GridFS rather than on local disk: hosts such as
// Render wipe the filesystem on every deploy, while the database persists.
const BUCKET_NAME = "quoteAttachments";

const bucket = () =>
  new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: BUCKET_NAME,
  });

// Keep the original name readable but safe for a Content-Disposition header.
export function safeFilename(name = "attachment.pdf") {
  const cleaned = name
    .replace(/[^\w.\- ()]+/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
  const base = cleaned || "attachment";
  return /\.pdf$/i.test(base) ? base : `${base}.pdf`;
}

export function saveAttachment(file, metadata = {}) {
  const filename = safeFilename(file.originalname);
  return new Promise((resolve, reject) => {
    const upload = bucket().openUploadStream(filename, {
      metadata: { contentType: "application/pdf", ...metadata },
    });
    upload.once("error", reject);
    upload.once("finish", () =>
      resolve({
        fileId: upload.id,
        filename,
        size: file.size,
        contentType: "application/pdf",
      }),
    );
    upload.end(file.buffer);
  });
}

export function openAttachment(fileId) {
  return bucket().openDownloadStream(new mongoose.Types.ObjectId(fileId));
}

export async function deleteAttachment(fileId) {
  try {
    await bucket().delete(new mongoose.Types.ObjectId(fileId));
  } catch (error) {
    console.error("[attachments] cleanup failed", { fileId, message: error.message });
  }
}
