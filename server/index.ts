import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Serve static files with proper cache headers
  app.use(express.static(staticPath, {
    maxAge: 0, // Don't cache
    etag: false, // Disable ETag
    lastModified: false, // Disable Last-Modified
    setHeaders: (res, path) => {
      // For hashed assets (with hash in filename), allow long-term caching
      if (path.match(/\.[a-f0-9]{8,}\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        // For other files (like index.html), prevent caching
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      }
    }
  }));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
