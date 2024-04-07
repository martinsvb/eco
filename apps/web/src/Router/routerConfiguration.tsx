import { Navigate, createBrowserRouter } from "react-router-dom";
import { routes } from "@eco/config";
import { ContentTypes } from "@eco/types";
import App from "../app/app";
import { Home } from "../app/Home";
import { Accounts, AccountsNew, AccountsEdit } from "../app/accounts";
import { Users } from "../app/Users";
import { ContentList } from "../app/content";

export const router = createBrowserRouter([
    {
      path: routes.base,
      element: <App />,
      children: [
        { index: true, element: <Navigate to={`${routes.base}${routes.home}`} replace /> },
        {
          path: routes.accounts,
          element: <Accounts />,
        },
        {
          path: routes.accountsNew,
          element: <AccountsNew />,
        },
        {
          path: routes.accountsEdit,
          element: <AccountsEdit />,
        },
        {
          path: routes.content.task.list,
          element: <ContentList type={ContentTypes.Task} />,
        },
        {
          path: routes.home,
          element: <Home />,
        },
        {
          path: routes.users,
          element: <Users />,
        },
      ],
    },
]);
