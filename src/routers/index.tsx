import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../index.css";

import Home from "@/pages/home/";
import Login from "@/pages/login";
import MyBook from "@/pages/my-book";
import Posts from "@/pages/posts";
import Detail from "@/pages/detail";
import Landing from "@/pages/Landing";
import Layout from "@/components/layout/Layout";
import Search from "@/pages/search";
import PostsNew from "@/pages/postsNew";
import PWABadge from "@/components/layout/PWABadge";
import Diaries from "@/pages/diaries";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/posts",
    element: <Posts />
  },
  {
    path: "/postsNew",
    element: <PostsNew />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/detail/:bookId",
        element: <Detail />
      },
      {
        path: "/diaries/:diaryId",
        element: <Diaries />
      },

      {
        path: `/mybook/:id`,
        element: <MyBook />
      },

      {
        path: "/search",
        element: <Search />
      }
    ]
  }
]);

export default function Router() {
  return (
    <>
      <PWABadge />
      <RouterProvider router={router} />
    </>
  );
}
