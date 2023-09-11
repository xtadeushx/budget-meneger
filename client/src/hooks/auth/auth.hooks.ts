import { useUserStore } from '../../zustand/store';
const useAuth = (): boolean => {
  const isAuth = useUserStore((state) => state.isAuth);

  return isAuth;
};

export { useAuth };
