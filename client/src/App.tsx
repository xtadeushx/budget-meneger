import { RouterProvider } from 'react-router-dom';
import { toast } from 'react-toastify';
import { router } from './router/router';
import { useAppDispatch } from './store/hooks';
import { getTokenFromLocalStorage } from './helpers/helpers';
import { authService } from './services/auth.services';
import { logOut, login } from './store/slices/user/userSlice';
import { useEffect } from './hooks/hooks';
import { ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';

function App() {
  const dispatch = useAppDispatch();
  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        const data = await authService.getProfile();
        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logOut());
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message
      toast.error(error?.toString());
    }
  };
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    checkAuth();
  }, [])
  return (
    <>
      <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
