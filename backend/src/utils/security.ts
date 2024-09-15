import { db } from "../schemas/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../envs.js";
import { IAccessToken, IUser } from "../schemas/user.js";

export const authenticate = async (
  email: string,
  password: string,
): Promise<IUser | undefined> => {
  const user = await db("users").select("*").where({ email }).first();
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

export const hashPassword = async (pw: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pw, salt);
};

export const verifyToken = async (token: string): Promise<IAccessToken> => {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
