import { useState, useNavigate, useDispatch } from '../hooks/hooks';
import { authService } from '../services/auth.services';
import { ExceptionMessage } from '../common/enums/enums';
import { toast } from 'react-toastify';
import { login } from '../store/slices/user/userSlice';
import { setTokenToLocalStorage } from '../helpers/helpers';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await authService.registration({ email, password })
      if (!data) throw new Error(ExceptionMessage.UNKNOWN_ERROR)
      toast.success('Registration Successfully')
      setLogin(!isLogin)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message
      toast.error(error?.toString());
    }
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await authService.login({ email, password })
      if (!data) throw new Error(ExceptionMessage.INCORRECT_EMAIL)
      setTokenToLocalStorage('token', data.token);
      dispatch(login(data))
      toast.success(' Successfully login');
      navigate('/')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message
      toast.error(error?.toString());
    }
  };

  return (
    < div className='mt-40 flex flex-col justify-center items-center bg-gray-400 text-slate-900 dark:bg-slate-900 dark:text-white' >
      <h1 className='text-center text-xl mb-10'>
        {isLogin ? 'Login' : 'Registration'}
      </h1>
      <form className='w-1/3 flex flex-col mx-auto gap-5' onSubmit={isLogin ? loginHandler : registrationHandler}>
        <input
          type="email"
          name="email"
          className='bg-transparent border bg-gray-400  placeholder:text-slate-700  dark:bg-slate-700 dark:border-slate-800 rounded-md outline-none dark:placeholder:text-white' placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          className='bg-transparent border bg-gray-400  placeholder:text-slate-700  dark:bg-slate-700 dark:border-slate-800 rounded-md outline-none dark:placeholder:text-white' placeholder='Email'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='btn btn-green mx-auto hover:bg-green-800'>
          Submit
        </button>
      </form>
      <div className="flex justify-center mt-5">
        {isLogin ? (
          <button onClick={() => setLogin(!isLogin)} className=' text-slate-700 dark:text-slate-300 hover:text-white'>
            You don't have an account?
          </button>) : (
          <button onClick={() => setLogin(!isLogin)} className='text-slate-700 dark:text-slate-300 hover:text-white'>
            Already have an account?
          </button>)
        }
      </div>
    </div>

  )
}

export { Auth };