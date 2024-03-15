import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../app/app";
import { Login } from "../app/Auth/Login";
import { Home } from "../app/Home";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
]);
