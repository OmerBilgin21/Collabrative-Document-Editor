import express, { Request, Response } from "express";
import { User } from "../blueprints/user.js";
import { IDocumentShares } from "../schemas/documentShares.js";
import {
  IError,
  NotFoundError,
  MissingParamsError,
  DBCreationError,
} from "../utils/errors.js";
import { DocumentShare } from "../blueprints/documentShares.js";
import { Document } from "../blueprints/doc.js";

const router = express.Router();

router.post(
  "/",
  async (
    req: Request,
    res: Response,
  ): Promise<Response<IDocumentShares | IError>> => {
    const { docId: docIdStr, email } = req.body;
    const docId = Number(docIdStr);

    if (!Number.isInteger(docId) || !email) {
      return res.status(400).json(MissingParamsError);
    }

    const foundUser = await User.getUser({ email });
    if (!foundUser || !foundUser?.id)
      return res.status(404).json(NotFoundError);

    const documentShareIns = new DocumentShare({
      doc_id: docId,
      user_id: foundUser.id,
    });

    let createdShare: IDocumentShares | undefined;

    try {
      createdShare = await documentShareIns.create();
    } catch (createShareError) {
      throw new Error(DBCreationError.error);
    }

    console.log("createdShare: ", createdShare);

    return res.json(createdShare);
  },
);

router.get(
  "/usersShares/:userId",
  async (
    req: Request,
    res: Response,
  ): Promise<Response<IDocumentShares[] | IError>> => {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json(MissingParamsError);
    }

    const foundUser = await User.getUser({ id: userId });

    if (!foundUser || !foundUser?.id) {
      return res.status(404).json(NotFoundError);
    }

    const sharesOfUser = await DocumentShare.getSharesOfUser(foundUser.id);
    if (!sharesOfUser || !sharesOfUser?.length) {
      return res.status(404).json(NotFoundError);
    }

    return res.json(sharesOfUser);
  },
);

router.get(
  "/documentShares/:docId",
  async (
    req: Request,
    res: Response,
  ): Promise<Response<IDocumentShares[] | IError>> => {
    const { docId: docIdStr } = req.params;
    const docId = Number(docIdStr);

    if (!Number.isInteger(docId)) {
      return res.status(400).json(MissingParamsError);
    }

    const foundDoc = await Document.getDocumentById(docId);

    if (!foundDoc || !foundDoc?.id) {
      return res.status(404).json(NotFoundError);
    }

    const sharesOfDoc = await DocumentShare.getSharesOfDocument(foundDoc.id);
    if (!sharesOfDoc || !sharesOfDoc?.length) {
      return res.status(404).json(NotFoundError);
    }

    return res.json(sharesOfDoc);
  },
);

export default router;
