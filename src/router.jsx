import Home from "./pages/Home";
import DashBoard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import { createBrowserRouter, Route, Link, redirect } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
]);

export default router;
