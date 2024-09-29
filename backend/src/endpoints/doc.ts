// external
import express, { Request, Response } from "express";

// blueprints
import { CreateDoc } from "../blueprints/doc.js";

// types
import type { IDocument } from "../schemas/doc.js";
import type { IError } from "../utils/errors.js";

// utils
import db from "../schemas/db.js";
import {
  NotFoundError,
  MissingParamsError,
  UnAuthorizedError,
} from "../utils/errors.js";
import { verifyToken } from "../utils/security.js";
import { IDocumentShares } from "../schemas/documentShares.js";
import { DocumentShare } from "../blueprints/documentShares.js";

const router = express.Router();

router.get(
  "/",
  async (req: Request, res: Response): Promise<Response<IDocument[]>> => {
    const token = req.cookies?.accessToken;
    if (!token) return res.status(401).json(UnAuthorizedError);

    const decodedToken = await verifyToken(token);
    if (!decodedToken) return res.status(401).json(UnAuthorizedError);

    const foundDocs = await db
      .select("*")
      .from<IDocument>("docs")
      .where({ owner_id: decodedToken.id });

    const sharesOfUser: IDocumentShares[] | void =
      await DocumentShare.getSharesOfUser(decodedToken.id);

    if (sharesOfUser?.length) {
      const sharedDocs: IDocument[] = await db
        .select("*")
        .from<IDocument>("docs")
        .whereRaw(
          "id = ?",
          sharesOfUser.map((share) => share.docId),
        );

      if (sharedDocs) foundDocs.push(...sharedDocs);
    }

    return res.json(foundDocs);
  },
);

router.get(
  "/:id",
  async (
    req: Request,
    res: Response,
  ): Promise<Response<IError | IDocument>> => {
    const token = req.cookies?.accessToken;
    const { id } = req.params;

    if (!token) return res.status(401).json(UnAuthorizedError);
    if (!id) return res.status(400).json(MissingParamsError);
    const decodedToken = await verifyToken(token);
    if (!decodedToken) return res.status(401).json(UnAuthorizedError);

    const foundDoc = await db
      .select("*")
      .from<IDocument>("docs")
      .where({ id: parseInt(id) })
      .first();

    if (!foundDoc) {
      return res.status(404).json(NotFoundError);
    }

    if (foundDoc.owner_id !== decodedToken.id) {
      return res.status(401).json(UnAuthorizedError);
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
    const { name } = req.body;

    const token = req.cookies?.accessToken;
    if (!token) return res.status(401).json(UnAuthorizedError);
    const decodedToken = await verifyToken(token);
    if (!decodedToken) return res.status(401).json(UnAuthorizedError);

    const creatableInstance = new CreateDoc({
      name,
      owner_id: decodedToken.id,
    });

    const createdDoc = await creatableInstance.createDoc();

    return res.json(createdDoc);
  },
);

export default router;
