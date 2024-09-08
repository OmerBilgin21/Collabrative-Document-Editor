export interface IUserCreate {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface IUser extends IUserCreate {
  id: number;
}
