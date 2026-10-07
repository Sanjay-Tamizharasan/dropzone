const { put } = require("@vercel/blob");

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024;

function sanitizeFilename(filename) {
  const cleaned = filename.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
  return cleaned.slice(0, 180) || "shared-file";
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Only POST requests are allowed." });
  }

  const filename = sanitizeFilename(String(request.query.filename || "shared-file"));
  const contentLength = Number(request.headers["content-length"] || 0);
  if (contentLength > MAX_FILE_SIZE) {
    return response.status(413).json({ error: "Files must be 2 GB or smaller." });
  }

  try {
    const blob = await put(`uploads/${Date.now()}-${filename}`, request, {
      access: "public",
      contentType: request.headers["content-type"] || "application/octet-stream",
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    return response.status(200).json({ url: blob.url });
  } catch (error) {
    console.error("Blob upload failed", error);
    return response.status(500).json({ error: "The file could not be uploaded. Check the Blob configuration." });
  }
};

module.exports.config = {
  api: {
    bodyParser: false,
    responseLimit: "2gb"
  }
};
