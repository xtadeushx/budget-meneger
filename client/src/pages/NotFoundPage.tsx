import { Link } from "react-router-dom";
import img from '../assets/not_found.png';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10">
      <img src={img} className="w-80" alt="not found page" />
      <Link to={'/'} className='bg-sky-500 px-6 py-2 hover:bg-sky-500'>Back</Link>
    </div>
  )
}

export { NotFoundPage };