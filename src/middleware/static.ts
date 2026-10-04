import fs from "node:fs";
import path from "node:path";
import type { Middleware } from "../types/middleware.js";

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export const staticMiddleware = (root: string): Middleware => {
  const rootDir = path.resolve(root);
  return async (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();

    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
    const decoded = decodeURIComponent(url.pathname);
    const filePath = path.join(rootDir, decoded);

    const rel = path.relative(rootDir, filePath);
    if (
      rel === ".." ||
      rel.startsWith(".." + path.sep) ||
      path.isAbsolute(rel)
    ) {
      return next();
    }

    let stats;
    try {
      stats = await fs.promises.stat(filePath);
    } catch {
      return next();
    }
    if (!stats.isFile()) return next();

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME_TYPES[ext] ?? "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": type,
      "Content-Length": String(stats.size),
      "Last-Modified": stats.mtime.toUTCString(),
    });
    if (req.method === "HEAD") {
      res.end()
      return;
    }

    try {
      const buf = await fs.promises.readFile(filePath);
      res.end(buf);
    } catch {
      next();
    }
  };
};
