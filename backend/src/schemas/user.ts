interface IUserBase {
  name: string;
  surname: string;
  email: string;
}

export interface IUser extends IUserBase {
  id?: number;
  password: string;
}

export interface IAccessToken extends IUserBase {
  id: number;
  iat: number;
  exp: number;
}
