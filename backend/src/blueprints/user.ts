// utils
import { usersTable } from "../schemas/db.js";
import { hashPassword } from "../utils/security.js";

// types
import type { IUser } from "../schemas/user.js";

export class User {
  readonly id?: number;
  name: string;
  surname: string;
  email: string;
  password: string;

  constructor(user: IUser) {
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.password = user.password;
    this.id = user?.id;
  }

  async create(): Promise<IUser | undefined> {
    const existingUser: IUser[] = await usersTable
      .select("*")
      .where({ email: this.email });

    if (existingUser.length) {
      return;
    }

    const hashedPassword = await hashPassword(this.password);

    const createdUser: IUser[] = await usersTable.returning("*").insert({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: hashedPassword,
    });

    return createdUser[0];
  }

  public static async getUser(filter: {
    email?: string;
    id?: string | number;
  }): Promise<IUser | void> {
    if (!filter?.email && !filter?.id) {
      return;
    }

    const dbFilter = filter?.email
      ? { email: filter?.email }
      : { id: filter?.id };

    return await usersTable.select("*").where(dbFilter).first();
  }

  async getThisUser(): Promise<IUser> {
    return await usersTable.select("*").where({ id: this.id }).first();
  }

  async updateUser(user: IUser): Promise<IUser> {
    const updatedUser: User[] = await usersTable
      .returning("*")
      .where({ id: this.id })
      .update(user);
    return updatedUser[0];
  }
}
