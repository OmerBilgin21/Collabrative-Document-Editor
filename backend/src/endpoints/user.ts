// external
import express, { Request, Response } from "express";

// schemas
import type { IUser } from "../schemas/user.js";
import type { IError } from "../utils/errors.js";

// blueprints
import { User } from "../blueprints/user.js";

// utils
import { NotFoundError, MissingParamsError } from "../utils/errors.js";

const router = express.Router();

router.get(
  "/:email",
  async (req: Request, res: Response): Promise<Response<IUser | IError>> => {
    const { email } = req.params;
    if (!email) return res.status(400).json(MissingParamsError);

    const foundUser = User.getUser(email);

    if (!foundUser) return res.status(404).json(NotFoundError);

    return res.json(foundUser);
  },
);

export default router;
