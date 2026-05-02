import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { defaultContent, type PortfolioContent } from "./src/data/content";

const rootDir = process.cwd();
const dataDir = path.join(rootDir, "data");
const contentFile = path.join(dataDir, "content.json");
const uploadsDir = path.join(rootDir, "public", "uploads");

type CollectionKey =
  | "education"
  | "academicAchievements"
  | "professionalAchievements"
  | "fieldWork"
  | "extraCurricular"
  | "references"
  | "gallery";

const collectionKeys: CollectionKey[] = [
  "education",
  "academicAchievements",
  "professionalAchievements",
  "fieldWork",
  "extraCurricular",
  "references",
  "gallery",
];

function cloneContent(content: PortfolioContent): PortfolioContent {
  return JSON.parse(JSON.stringify(content));
}

function ensureStorage() {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(uploadsDir, { recursive: true });
}

function mergeContent(content: Partial<PortfolioContent>): PortfolioContent {
  return {
    ...cloneContent(defaultContent),
    ...content,
    contact: {
      ...defaultContent.contact,
      ...(content.contact ?? {}),
      details: content.contact?.details ?? defaultContent.contact.details,
    },
  };
}

function readContent(): PortfolioContent {
  ensureStorage();

  if (!fs.existsSync(contentFile)) {
    return cloneContent(defaultContent);
  }

  try {
    return mergeContent(JSON.parse(fs.readFileSync(contentFile, "utf8")));
  } catch (error) {
    console.error("Unable to read content.json:", error);
    return cloneContent(defaultContent);
  }
}

function saveContent(content: PortfolioContent) {
  ensureStorage();
  fs.writeFileSync(contentFile, JSON.stringify(content, null, 2));
}

function isCollectionKey(value: string): value is CollectionKey {
  return collectionKeys.includes(value as CollectionKey);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  ensureStorage();
  app.use(express.json({ limit: "25mb" }));
  app.use("/uploads", express.static(uploadsDir, { maxAge: "7d" }));

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/content", (req, res) => {
    res.json(readContent());
  });

  app.post("/api/content/:section", (req, res) => {
    const { section } = req.params;

    if (!isCollectionKey(section)) {
      res.status(400).json({ error: "Unknown content section" });
      return;
    }

    const content = readContent();
    const item = {
      ...req.body,
      id: req.body.id || crypto.randomUUID(),
    };

    content[section] = [item, ...content[section]] as never;
    saveContent(content);
    res.status(201).json(item);
  });

  app.delete("/api/content/:section/:id", (req, res) => {
    const { section, id } = req.params;

    if (!isCollectionKey(section)) {
      res.status(400).json({ error: "Unknown content section" });
      return;
    }

    const content = readContent();
    content[section] = content[section].filter((item) => item.id !== id) as never;
    saveContent(content);
    res.json({ success: true });
  });

  app.put("/api/content/contact", (req, res) => {
    const content = readContent();
    content.contact = {
      ...content.contact,
      ...req.body,
      details: content.contact.details,
    };
    saveContent(content);
    res.json(content.contact);
  });

  app.post("/api/content/contact/details", (req, res) => {
    const content = readContent();
    const detail = {
      ...req.body,
      id: req.body.id || crypto.randomUUID(),
    };
    content.contact.details = [detail, ...content.contact.details];
    saveContent(content);
    res.status(201).json(detail);
  });

  app.delete("/api/content/contact/details/:id", (req, res) => {
    const content = readContent();
    content.contact.details = content.contact.details.filter((detail) => detail.id !== req.params.id);
    saveContent(content);
    res.json({ success: true });
  });

  app.post("/api/upload", (req, res) => {
    const { fileName, dataUrl } = req.body as { fileName?: string; dataUrl?: string };

    if (!fileName || !dataUrl) {
      res.status(400).json({ error: "fileName and dataUrl are required" });
      return;
    }

    const match = dataUrl.match(/^data:(image\/(?:png|jpe?g|webp|gif));base64,(.+)$/);
    if (!match) {
      res.status(400).json({ error: "Only png, jpg, webp, and gif images are supported" });
      return;
    }

    const mime = match[1];
    const extensionByMime: Record<string, string> = {
      "image/png": ".png",
      "image/jpeg": ".jpg",
      "image/jpg": ".jpg",
      "image/webp": ".webp",
      "image/gif": ".gif",
    };
    const extension = extensionByMime[mime] ?? path.extname(fileName).toLowerCase();
    const safeBaseName = path
      .basename(fileName, path.extname(fileName))
      .replace(/[^a-z0-9-]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "image";
    const finalName = `${safeBaseName}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}${extension}`;
    const buffer = Buffer.from(match[2], "base64");

    if (buffer.length > 12 * 1024 * 1024) {
      res.status(413).json({ error: "Image is too large. Please use an image under 12 MB." });
      return;
    }

    const targetPath = path.join(uploadsDir, finalName);
    fs.writeFileSync(targetPath, buffer);
    res.status(201).json({ url: `/uploads/${finalName}` });
  });

  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    // In a real app, you would send an email or save to a database here
    console.log("Received contact form submission:", { name, email, message });
    res.json({ success: true, message: "Message sent successfully!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist", {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-cache");
          return;
        }

        if (filePath.includes("\\assets\\") || filePath.includes("/assets/")) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          return;
        }

        if (/\.(avif|webp|png|jpe?g|gif|svg|ico|woff2?)$/i.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=604800");
        }
      },
    }));

    app.get("*", (req, res) => {
      res.sendFile(path.join(rootDir, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
