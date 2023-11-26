import { createBrowserRouter } from "react-router-dom";

import { App } from "@/App";
import { PATH } from "@/common/constants/route-path";
import { MainFormChats } from "@/components/main-form-chats/main-form-chats";
import { Login } from "@/services/auth/components/login/login";
import { Register } from "@/services/auth/components/register/register";

import { ProtectedRoutes } from "./protected-routes";

export const router = createBrowserRouter([
  {
    // errorElement: <PageNotFound />,
    children: [
      {
        children: [
          {
            element: <MainFormChats />,
            index: true,
          },
        ],
        element: <ProtectedRoutes />,
      },
      {
        element: <Login />,
        path: PATH.LOGIN,
      },
      {
        element: <Register />,
        path: PATH.REGISTRATION,
      },
    ],
    element: <App />,
    path: "/",
  },
]);
