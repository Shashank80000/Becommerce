import { v2 as cloudinary } from "cloudinary";

const requiredConfig = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

export function getCloudinary() {
  const missing = requiredConfig.filter((name) => !process.env[name]);
  if (missing.length) {
    const error = new Error(
      `Cloudinary is not configured. Missing: ${missing.join(", ")}`,
    );
    error.statusCode = 503;
    throw error;
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
}

export function uploadProductImage(buffer) {
  const client = getCloudinary();
  return new Promise((resolve, reject) => {
    const stream = client.uploader.upload_stream(
      {
        folder: "cleanwiper/products",
        resource_type: "image",
        transformation: [
          {
            width: 1400,
            height: 1050,
            crop: "fill",
            gravity: "auto",
            quality: "auto",
          },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => (error ? reject(error) : resolve(result)),
    );
    stream.end(buffer);
  });
}
