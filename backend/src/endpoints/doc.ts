// external
import express, { Request, Response } from "express";

// blueprints
import { CreateDoc } from "../blueprints/doc.js";

// types
import type { IDocument } from "../schemas/doc.js";
import type { IError } from "../utils/errors.js";

// utils
import db from "../schemas/db.js";
import { NotFoundError, MissingParamsError } from "../utils/errors.js";

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
  ): Promise<Response<IError | IDocument>> => {
    const { id } = req.params;

    if (!id) return res.status(400).json(MissingParamsError);

    const foundDoc = await db
      .select("*")
      .from<IDocument>("docs")
      .where({ id: parseInt(id) })
      .first();

    if (!foundDoc) {
      return res.status(404).json(NotFoundError);
    }

    return res.json(foundDoc);
  },
);

router.post(
  "/",
  async (
    req: Request,
    res: Response,
  ): Promise<Response<IError | IDocument>> => {
    const { name, ownerId } = req.body;

    if (!name || !ownerId) return res.status(400).json(MissingParamsError);

    const creatableInstance = new CreateDoc({ name, owner_id: ownerId });

    const createdDoc = await creatableInstance.createDoc();

    return res.json(createdDoc);
  },
);

export default router;
