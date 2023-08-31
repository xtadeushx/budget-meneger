import { instance } from '../api/axios.api';
import { ApiPath, AuthApiPath, ExceptionMessage } from '../common/enums/enums';
import { IResponseUserData, IUserData } from '../types/types';

class AuthServices {
  constructor() {}

  async registration(
    userData: IUserData,
  ): Promise<IResponseUserData | undefined> {
    try {
      const { data } = await instance.post<
        IUserData,
        { data: IResponseUserData }
      >(`${ApiPath.AUTH}/${AuthApiPath.REGISTER}`, userData);
      if (!data) throw new Error(ExceptionMessage.UNKNOWN_ERROR);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async login(userData: IUserData) {
    try {
      const { data } = await instance.post(
        `${ApiPath.AUTH}/${AuthApiPath.LOGIN}`,
        userData,
      );
      if (!data) throw new Error(ExceptionMessage.INCORRECT_EMAIL);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getMe() {}
}
const authService = new AuthServices();
export { authService };
