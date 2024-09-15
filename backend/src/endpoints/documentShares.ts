import express, { Request, Response } from "express";
import { db, sharesTable, usersTable } from "../schemas/db.js";
import { User } from "../blueprints/user.js";
import { IDocumentShares } from "../schemas/documentShares.js";
import {
  IError,
  NotFoundError,
  MissingParamsError,
  DBCreationError,
} from "../utils/errors.js";
import { DocumentShare } from "../blueprints/documentShares.js";

const router = express.Router();

router.post(
  "/",
  async (
    req: Request,
    res: Response,
  ): Promise<Response<IDocumentShares | IError>> => {
    const { docId: docIdStr, userId: userIdStr } = req.body;
    const docId = Number(docIdStr);
    const userId = Number(userIdStr);

    if (!Number.isInteger(docId) || !Number.isInteger(userId)) {
      return res.status(400).json(MissingParamsError);
    }

    const documentShareIns = new DocumentShare({
      doc_id: docId,
      user_id: userId,
    });

    let createdShare: IDocumentShares | undefined;

    try {
      createdShare = await documentShareIns.create();
    } catch (createShareError) {
      throw new Error(DBCreationError.error);
    }

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

export default router;
