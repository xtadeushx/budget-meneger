import { instance } from '../api/axios.api';
import { ApiPath, AuthApiPath } from '../common/enums/enums';
import { IResponseRegisterUserData, IUser, IUserData } from '../types/types';

class AuthServices {
  constructor() {}

  async registration(userData: IUserData): Promise<IResponseRegisterUserData> {
    const { data } = await instance.post<IResponseRegisterUserData>(
      `${ApiPath.AUTH}/${AuthApiPath.REGISTER}`,
      userData,
    );
    return data;
  }
  async login(userData: IUserData): Promise<IUser> {
    const { data } = await instance.post<IUser>(
      `${ApiPath.AUTH}/${AuthApiPath.LOGIN}`,
      userData,
    );
    return data;
  }
  async getProfile() {
    const { data } = await instance.get<IUser>(
      `${ApiPath.AUTH}/${AuthApiPath.PROFILE}`,
    );
    if (data) return data;
  }
}
const authService = new AuthServices();
export { authService };
