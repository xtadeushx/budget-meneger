import { useState } from 'react';
import { authService } from '../services/auth.services';
import { ExceptionMessage } from '../common/enums/enums';
import { toast } from 'react-toastify';
const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setLogin] = useState(false);

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await authService.registration({ email, password })
      if (!data) throw new Error(ExceptionMessage.UNKNOWN_ERROR)
      toast.success('Registration Successfully')
      setLogin(!isLogin)
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message
      toast.error(error?.toString());
    }
  }

  return (
    < div className='mt-40 flex flex-col justify-center items-center bg-slate-900 text-white' >
      <h1 className='text-center text-xl mb-10'>
        {isLogin ? 'Login' : 'Registration'}
      </h1>
      <form className='w-1/3 flex flex-col mx-auto gap-5' onSubmit={registrationHandler}>
        <input
          type="email"
          name="email"
          className='bg-transparent border bg-slate-700 border-slate-800 rounded-md outline-none placeholder:text-white' placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          className='bg-transparent border bg-slate-700 border-slate-800 rounded-md outline-none placeholder:text-white' placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='btn btn-green mx-auto hover:bg-green-800'>
          Submit
        </button>
      </form>
      <div className="flex justify-center mt-5">
        {isLogin ? (
          <button onClick={() => setLogin(!isLogin)} className='text-slate-300 hover:text-white'>
            You don't have an account?
          </button>) : (
          <button onClick={() => setLogin(!isLogin)} className='text-slate-300 hover:text-white'>
            Already have an account?
          </button>)
        }
      </div>
    </div>
  )
}

export { Auth };