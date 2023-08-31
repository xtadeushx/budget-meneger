import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { Auth } from "../pages/Auth";
import { Categories } from "../pages/Categories";
import { Home } from "../pages/Home";
import { Transactions } from "../pages/Transactions";
import { ErrorPage } from "../pages/ErrorPage";
import { NotFoundPage } from "../pages/NotFoundPage";

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
        element: <Categories />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      }
    ]
  },
]);

export { router };