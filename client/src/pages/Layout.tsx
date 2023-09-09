import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const Layout: React.FC = () => {
  return (

    <div className='bg-gray-400 min-h-screen  dark:bg-slate-900 font-roboto text-white pb-20'>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div >
  )
}

export { Layout };