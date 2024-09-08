// utils
import db from "../schemas/db.js";
import bcrypt from "bcrypt";

// types
import type { IUserCreate, IUser } from "../schemas/user.js";

export class CreateUser {
  name: string;
  surname: string;
  email: string;
  password: string;

  constructor(user: IUserCreate) {
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.password = user.password;
  }

  async create(): Promise<IUser | undefined> {
    const existingUser: IUser = await db("users")
      .select("*")
      .where({ email: this.email })
      .first();

    if (existingUser) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    const createdUser: IUser[] = await db("users").returning("*").insert({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: hashedPassword,
    });

    return createdUser[0];
  }
}

export class User extends CreateUser {
  readonly id: number;

  constructor(user: IUser) {
    super({
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
    });
    this.id = user.id;
  }

  public static async getUser(email: string): Promise<IUser | undefined> {
    const found: IUser = await db("users")
      .select("*")
      .where({ id: email })
      .first();
    if (!found) return;
    return found;
  }

  async getThisUser(): Promise<IUser> {
    return await db("users").select("*").where({ id: this.id }).first();
  }

  async updateUser(user: IUser): Promise<IUser> {
    const updatedUser: User[] = await db("users")
      .returning("*")
      .where({ id: this.id })
      .update(user);
    return updatedUser[0];
  }
}
