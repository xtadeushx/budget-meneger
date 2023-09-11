import { create } from 'zustand';
import { IUser } from '../types/types';

type State = {
  user: IUser | null;
  isAuth: boolean;
};

type Action = {
  login: (user: State['user']) => void;
  logOut: () => void;
};

const useUserStore = create<State & Action>((set) => ({
  user: null,
  isAuth: false,
  login: (user) => set(() => ({ user: user, isAuth: true })),
  logOut: () => set(() => ({ user: null, isAuth: false })),
}));

export { useUserStore };
