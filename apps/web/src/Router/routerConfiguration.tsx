import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { routes } from "@eco/config";
import { ContentTypes } from "@eco/types";
import App from "../app/app";
import { Home } from "../app/Home";
import { Accounts, AccountsNew, AccountsEdit } from "../app/accounts";
import { Users } from "../app/Users/Users";
import { ContentDetail, ContentList, ContentNew } from "../app/content";
import LoginWrapper from "../app/user/LoginWrapper";
import Invitation from "../app/Auth/Invitation";
import { UserEdit } from "../app/user/UserEdit";
import { Companies } from "../app/Companies/Companies";
import { Contacts } from "../app/Contacts/Contacts";
import { NotFound } from "../app/NotFound";
import { Errors } from "../app/errors/Errors";
import { Error } from "../app/errors/Error";
import { ErrorBoundary } from "../app/layout/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: routes.base,
    element: <App />,
    children: [
      { index: true, element: <Navigate to={routes.home} replace /> },
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.invitation,
        element: <Invitation />,
      },
      {
        path: routes.notFound,
        element: <NotFound />,
      },
      {
        path: routes.app,
        element: <ErrorBoundary><LoginWrapper><Outlet /></LoginWrapper></ErrorBoundary>,
        children: [
          {
            path: routes.errors,
            element: <Errors />,
          },
          {
            path: routes.errorsDetail,
            element: <Error />,
          },
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
            path: routes.companies,
            element: <Companies />,
          },
          {
            path: routes.contacts,
            element: <Contacts />,
          },
          {
            path: routes.content.task.list,
            element: <ContentList type={ContentTypes.Task} />,
          },
          {
            path: routes.content.task.new,
            element: <ContentNew type={ContentTypes.Task} />,
          },
          {
            path: routes.content.task.detail,
            element: <ContentDetail type={ContentTypes.Task} />,
          },
          {
            path: routes.content.record.list,
            element: <ContentList type={ContentTypes.Record} />,
          },
          {
            path: routes.content.record.new,
            element: <ContentNew type={ContentTypes.Record} />,
          },
          {
            path: routes.content.record.detail,
            element: <ContentDetail type={ContentTypes.Record} />,
          },
          {
            path: routes.users,
            element: <Users />,
          },
          {
            path: routes.usersEdit,
            element: <UserEdit />,
          },
        ],
      },
    ],
  },
]);
