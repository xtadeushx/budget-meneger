export interface IUserData {
  email: string;
  password: string;
}

export interface IResponseRegisterUserData {
  email: string;
  password: string;
  createAt: string;
  updatedAt: string;
  id: string;
}

export interface IResponseLoginUserData {
  user: Pick<IResponseRegisterUserData, 'email' | 'id' | 'password'>;
  token: string;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  token: string;
}
