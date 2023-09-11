import { useAuth, Link, NavLink, useNavigate } from '../hooks/hooks';
import { FaBtc, FaSignOutAlt } from 'react-icons/fa';
// import { logOut } from '../store/slices/user/userSlice';
import { removeTokenFromLocalStorage } from '../helpers/helpers';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useUserStore } from '../zustand/store';



const Header: React.FC = () => {
  const logOut = useUserStore((state) => state.logOut)
  const isAuth = useAuth();
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { toggle } = useContext(ThemeContext);

  const logOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logOut();
    removeTokenFromLocalStorage('token');
    navigate('/auth')
  };

  return (
    <header className='flex items-center justify-between  p-4 shadow-sm bg-gray-300  dark:bg-slate-800 backdrop-blur-sm' >
      <Link to={'/'}>
        <FaBtc size={20} className='text-slate-800 dark:text-gray-200' />
      </Link>
      <div className="flex justify-end w-100 items-center">
        <label className="toggleDarkBtn mr-2">
          <input type="checkbox" onClick={() => toggle()} />
          <span className="slideBtnTg round"></span>
        </label>

        {
          isAuth && (
            <nav className='ml-auto mr-10'>

              <ul className='flex items-center gap-5'>
                <li>
                  <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-slate-800 dark:text-gray-200' : 'text-slate-500 dark:text-white/50'}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={'/transactions'} className={({ isActive }) => isActive ? 'text-slate-800 dark:text-gray-200' : 'text-slate-500 dark:text-white/50'}>Transactions</NavLink>
                </li>
                <li>
                  <NavLink to={'/categories'} className={({ isActive }) => isActive ? 'text-slate-800 dark:text-gray-200' : 'text-slate-500 dark:text-white/50'}>Categories</NavLink>
                </li>


              </ul>
            </nav>
          )
        }

        {
          isAuth ?
            (
              <button onClick={logOutHandler} className='btn btn-red hover: bg-rose-800 px-2 py-1' >
                <span>Log Out</span>
                <FaSignOutAlt />
              </button>
            ) :
            (
              <Link to={"/auth"} className='py-2 text-slate-800  dark:text-white/50 hover:text-white ml-auto' >
                Log In / Sing In
              </Link>
            )
        }
      </div>
    </header >
  )
}

export default Header