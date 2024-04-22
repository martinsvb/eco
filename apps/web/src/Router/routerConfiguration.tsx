import { Navigate, createBrowserRouter } from "react-router-dom";
import { routes } from "@eco/config";
import { ContentTypes } from "@eco/types";
import App from "../app/app";
import { Home } from "../app/Home";
import { Accounts, AccountsNew, AccountsEdit } from "../app/accounts";
import { Users } from "../app/Users";
import { ContentEdit, ContentList, ContentNew } from "../app/content";
import LoginWrapper from "../app/user/LoginWrapper";

export const router = createBrowserRouter([
    {
      path: routes.base,
      element: <App />,
      children: [
        { index: true, element: <Navigate to={routes.home} replace /> },
        {
          path: routes.accounts,
          element: <LoginWrapper><Accounts /></LoginWrapper>,
        },
        {
          path: routes.accountsNew,
          element: <LoginWrapper><AccountsNew /></LoginWrapper>,
        },
        {
          path: routes.accountsEdit,
          element: <LoginWrapper><AccountsEdit /></LoginWrapper>,
        },
        {
          path: routes.content.task.list,
          element: <LoginWrapper><ContentList type={ContentTypes.Task} /></LoginWrapper>,
        },
        {
          path: routes.content.task.new,
          element: <LoginWrapper><ContentNew type={ContentTypes.Task} /></LoginWrapper>,
        },
        {
          path: routes.content.task.edit,
          element: <LoginWrapper><ContentEdit type={ContentTypes.Task} /></LoginWrapper>,
        },
        {
          path: routes.home,
          element: <Home />,
        },
        {
          path: routes.users,
          element: <LoginWrapper><Users /></LoginWrapper>,
        },
      ],
    },
]);
