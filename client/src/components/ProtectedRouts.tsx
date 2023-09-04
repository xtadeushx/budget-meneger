import { useAuth } from "../hooks/hooks";

interface IProtectedRoutsProps {
  children: JSX.Element
}
const ProtectedRouts: React.FC<IProtectedRoutsProps> = ({ children }) => {
  const isAuth = useAuth()

  return (
    <>{isAuth ? children :
      <div className="flex flex-col justify-center items-center mt-20 gap-10">
        <h1 className="text-2xl">
          To view this page please login
        </h1>
      </div>
    }</>
  )
}

export { ProtectedRouts };