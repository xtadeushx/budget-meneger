import { useAppSelector } from '../../store/hooks';

const useAuth = (): boolean => {
  const { isAuth } = useAppSelector((state) => state.user);
  return isAuth;
};

export { useAuth };
