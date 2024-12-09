import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import '../index.css'

import Home from "@/pages/home/";
import Login from "@/pages/login";
import MyBook from "@/pages/my-book";
import Posts from "@/pages/posts";
import Detail from "@/pages/detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/detail",
    element: <Detail />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/mybook",
    element: <MyBook />
  },
  {
    path: "/posts",
    element: <Posts />
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
