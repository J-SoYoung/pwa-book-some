import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../index.css";

import Layout from "../components/Layout";
import Home from "@/pages/home/";
import Login from "@/pages/login";
import MyBook from "@/pages/my-book";
import Posts from "@/pages/posts";
import Detail from "@/pages/detail";
import PostsNew from "@/pages/postsNew";
import Landing from "@/pages/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing /> // 랜딩페이지
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
        path: "/postsNew",
        element: <PostsNew />
      },
      {
        path: "/posts",
        element: <Posts />
      }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
