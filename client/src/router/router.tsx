import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { Auth } from "../pages/Auth";
import { Categories } from "../pages/Categories";
import { Home } from "../pages/Home";
import { Transactions } from "../pages/Transactions";
import { ErrorPage } from "../pages/ErrorPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProtectedRouts } from "../components/ProtectedRouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "categories",
        element:
          <ProtectedRouts>
            <Categories />
          </ProtectedRouts>,
      },
      {
        path: "transactions",
        element:
          <ProtectedRouts>
            <Transactions />
          </ProtectedRouts>,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      }
    ]
  },
]);

export { router };