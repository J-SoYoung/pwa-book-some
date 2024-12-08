import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import '../index.css'

import Home from "@/pages/home/";
import Login from "@/pages/login";
import MyBook from "@/pages/my-book";
import Posts from "@/pages/posts";

const router = createBrowserRouter([
  {
    path: "/landing",
    element: <App />
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/",
    element: <Home />
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
