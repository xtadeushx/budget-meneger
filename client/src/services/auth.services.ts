import { instance } from '../api/axios.api';
import { ApiPath, AuthApiPath } from '../common/enums/enums';
import {
  IResponseLoginUserData,
  IResponseRegisterUserData,
  IUserData,
} from '../types/types';

class AuthServices {
  constructor() {}

  async registration(userData: IUserData): Promise<IResponseRegisterUserData> {
    const { data } = await instance.post<IResponseRegisterUserData>(
      `${ApiPath.AUTH}/${AuthApiPath.REGISTER}`,
      userData,
    );
    return data;
  }
  async login(userData: IUserData): Promise<IResponseLoginUserData> {
    const { data } = await instance.post<IResponseLoginUserData>(
      `${ApiPath.AUTH}/${AuthApiPath.LOGIN}`,
      userData,
    );
    return data;
  }
  async getMe() {}
}
const authService = new AuthServices();
export { authService };
