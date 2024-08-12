// external
import express, { Request, Response } from "express";

// blueprints
import { CreateDoc } from "../blueprints/doc.js";

// types
import { IDocument } from "../schemas/doc.js";

// utils
import db from "../schemas/db.js";

const router = express.Router();

router.get(
  "/",
  async (_req: Request, res: Response): Promise<Response<IDocument[]>> => {
    const foundDocs = await db.select("*").from<IDocument>("docs");
    return res.json(foundDocs);
  },
);

router.get(
  "/:id",
  async (
    req: Request,
    res: Response,
  ): Promise<Response<{ error: string } | IDocument>> => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Missing params!" });

    const foundDoc = await db
      .select("*")
      .from<IDocument>("docs")
      .where({ id: parseInt(id) })
      .first();

    if (!foundDoc) {
      return res.status(404).json({ error: "Not found!" });
    }

    return res.json(foundDoc);
  },
);

router.post(
  "/",
  async (
    req: Request,
    res: Response,
  ): Promise<Response<{ error: string } | IDocument>> => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Missing body!" });

    const creatableInstance = new CreateDoc({ name });

    const createdDoc = await creatableInstance.createDoc();

    return res.json(createdDoc);
  },
);

export default router;
