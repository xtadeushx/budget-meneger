import { RouterProvider } from 'react-router-dom';
import { toast } from 'react-toastify';
import { router } from './router/router';
import { getTokenFromLocalStorage } from './helpers/helpers';
import { authService } from './services/auth.service';
import { useEffect } from './hooks/hooks';
import { ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';
import { useUserStore } from './zustand/store';

function App() {
  const login = useUserStore((state) => state.login)
  const logOut = useUserStore((state) => state.logOut)

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        const data = await authService.getProfile();
        if (data) {
          login(data);
        } else {
          logOut();
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
