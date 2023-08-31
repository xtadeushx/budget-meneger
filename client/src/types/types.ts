export interface IUserData {
  email: string;
  password: string;
}

export interface IResponseUserData {
  email: string | undefined;
  password: string | undefined;
  createAt: string | undefined;
  updatedAt: string | undefined;
  _v?: string | undefined;
  _id?: string | undefined;
  message: string | undefined;
}
