// external
import express, { Request, Response } from "express";

// blueprints
import { User } from "../blueprints/user.js";

// utils
import { authenticate, verifyToken } from "../utils/security.js";
import { generateAccessToken } from "../utils/security.js";

// envs
import { NODE_ENV } from "../envs.js";

// errors
import {
  MissingParamsError,
  UserConflictError,
  IncorrectCredentialsError,
  TokenInvalidError,
} from "../utils/errors.js";

//types
import type { IError } from "../utils/errors.js";

const router = express.Router();

router.get(
  "/",
  async (
    req: Request,
    res: Response,
  ): Promise<
    Response<{ email: string; name: string; surname: string } | IError>
  > => {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    try {
      const decodedToken = await verifyToken(token);
      console.log("decodedToken: ", decodedToken);

      return res.status(200).json({
        email: decodedToken,
        name: decodedToken,
        surname: decodedToken.surname,
        id: decodedToken.id,
      });
    } catch (error) {
      return res.status(401).json(TokenInvalidError);
    }
  },
);

router.get(
  "/:email/:password",
  async (req: Request, res: Response): Promise<Response<IError | void>> => {
    const { email, password } = req.params;
    console.log("email: ", email);
    console.log("passwords: ", password);
    if (!email || !password) return res.status(400).json(MissingParamsError);

    const validatedUser = await authenticate(email, password);
    if (!validatedUser) return res.status(401).json(IncorrectCredentialsError);

    const token = generateAccessToken(validatedUser);
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .send();
  },
);

router.post(
  "/signup",
  async (req: Request, res: Response): Promise<Response<IError | User>> => {
    const { email, name, surname, password } = req.body;
    if (!email || !name || !surname || !password)
      return res.status(400).json(MissingParamsError);

    const userIns = new User({
      name,
      surname,
      email,
      password,
    });

    const createdUser = await userIns.create();

    if (!createdUser) return res.status(409).json(UserConflictError);

    const token = generateAccessToken(createdUser);

    return res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .send();
  },
);

export default router;
