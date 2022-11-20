import { createBrowserRouter, Navigate } from "react-router-dom";
import { DataVisualization } from "./pages/data-visualization";
import { ForgotPassword } from "./pages/forgot-password";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Query } from "./pages/query";
import { ResetPassword } from "./pages/reset-password";
import { SignUp } from "./pages/sign-up";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/query",
    element: <Query />,
  },
  {
    path: "data-visualization",
    element: <DataVisualization />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
