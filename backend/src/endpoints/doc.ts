// external
import express, { Request, Response } from "express";

// blueprints
import { CreateDoc, Document } from "../blueprints/doc.js";

// utils
import db from "../schemas/db.js";

const router = express.Router();

router.get(
  "/",
  async (_req: Request, res: Response): Promise<Response<Document[]>> => {
    const foundDocs = await db.select("*").from<Document>("docs");
    return res.json(foundDocs);
  },
);

router.get(
  "/:id",
  async (
    req: Request,
    res: Response,
  ): Promise<Response<{ error: string } | Document>> => {
    const { id } = req.params;

    console.log("id: ", id);

    if (typeof id !== "string")
      return res.status(400).json({ error: "Missing params!" });

    const foundDoc = await db
      .select("*")
      .from<Document>("docs")
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
  ): Promise<Response<{ error: string } | Document>> => {
    const { title, name } = <{ title: string; name: string }>req.body;

    if (!title || !name)
      return res.status(400).json({ error: "Missing body!" });

    const creatableInstance = new CreateDoc({ title, name });
    const createdDoc = await creatableInstance.createDoc();

    return res.json(createdDoc);
  },
);

export default router;
