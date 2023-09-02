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
  user: Pick<IResponseRegisterUserData, 'email' | 'id'>;
  token: string;
}
