// external
import express, { Request, Response } from "express";

// blueprints
import { User, CreateUser } from "../blueprints/user.js";

// utils
import { generateAccessToken } from "../utils/security.js";

import {
  MissingParamsError,
  UserConflictError,
  IncorrectCredentialsError,
} from "../utils/errors.js";
import { authenticate } from "../utils/security.js";

//types
import type { IError } from "../utils/errors.js";

const router = express.Router();

router.get(
  "/",
  async (req: Request, res: Response): Promise<Response<IError | string>> => {
    const { email, password } = req.params;
    if (!email || !password) return res.status(400).json(MissingParamsError);

    const validatedUser = await authenticate(email, password);
    if (!validatedUser) return res.status(401).json(IncorrectCredentialsError);

    const token = generateAccessToken(validatedUser);
    return res.send(token);
  },
);

router.post(
  "/",
  async (req: Request, res: Response): Promise<Response<IError | User>> => {
    const { email, name, surname, password } = req.body;
    if (!email || !name || !surname || !password)
      return res.status(400).json(MissingParamsError);

    const CreateUserIns = new CreateUser({
      name,
      surname,
      email,
      password,
    });

    const createdUser = CreateUserIns.create();

    if (!createdUser) res.status(409).json(UserConflictError);

    return res.json(createdUser);
  },
);

export default router;
