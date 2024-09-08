import db from "../schemas/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../envs.js";
import { IUser } from "../schemas/user.js";

export const authenticate = async (
  email: string,
  password: string,
): Promise<IUser | undefined> => {
  const user = await db("users").select("*").where({ email }).first();

  if (!user) return;

  if (!user) return;

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return;

  return user;
};

export const generateAccessToken = (user: IUser) => {
  return jwt.sign(
    {
      name: user.name,
      surname: user.surname,
      id: user.id,
      email: user.email,
    },
    SECRET_KEY,
    {
      expiresIn: "2 days",
    },
  );
};
