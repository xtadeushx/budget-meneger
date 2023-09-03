import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IUser } from '../../../types/types';

interface IUserProperty {
  user: IUser;
  isAuth: boolean;
}

const initialState: IUserProperty = {
  user: { id: null, email: '', password: '', token: '' },
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserProperty>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
  },
});

export const { login } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
