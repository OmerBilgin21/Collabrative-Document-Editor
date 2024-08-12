// external
import express, { Request, Response } from "express";

// blueprints
import { DocumentVersionCreate } from "../blueprints/version.js";

// utils
import db from "../schemas/db.js";

// types
import { IDocument } from "../schemas/doc.js";
import { IDocumentVersion } from "../schemas/version.js";
import { getLatestVersionEntry } from "../utils/version.js";

const router = express.Router();

router.get(
  "/:id/latest",
  async (
    req: Request,
    res: Response,
  ): Promise<Response<{ error: string } | IDocumentVersion>> => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing query parameter" });
    }

    const latestVersion = await getLatestVersionEntry(id);

    if (!latestVersion) {
      res.status(400).json({ error: "Missing query parameter" });
    }

    return res.json(latestVersion);
  },
);

router.get(
  "/:id",
  async (
    req: Request,
    res: Response,
  ): Promise<Response<{ error: string } | IDocumentVersion[]>> => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Missing ID" });

    const foundVersions = await db
      .select("*")
      .from<IDocumentVersion>("doc_versions")
      .where({ doc_id: parseInt(id) })
      .orderBy("created_at", "desc");

    return res.json(foundVersions);
  },
);

router.post(
  "/",
  async (
    req: Request,
    res: Response,
  ): Promise<Response<{ error: string } | IDocumentVersion>> => {
    const { doc_id, text } = req.body;

    if (!doc_id || !text) {
      return res.status(400).json({ error: "Missing body!" });
    }

    const foundDoc = await db
      .select("*")
      .from<IDocument>("docs")
      .where({ id: parseInt(doc_id) })
      .first();

    if (!foundDoc) {
      return res.status(404).json({ error: "Document not found!" });
    }

    const creatableInstance = new DocumentVersionCreate({ doc_id, text });
    const createdVersion = await creatableInstance.createDocVersion();

    return res.json(createdVersion);
  },
);

export default router;
