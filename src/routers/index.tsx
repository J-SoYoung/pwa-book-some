import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../index.css";

import PWABadge from "./components/PWABadge";
import Layout from "@/shared/components/layout/Layout";

import Home from "@/pages/home/";
import Login from "@/pages/login";
import MyBook from "@/pages/my-book";
import Posts from "@/pages/posts";
import Detail from "@/pages/detail";
import Landing from "@/pages/Landing";
import SearchResults from "@/pages/searchResults";
import { PostsNew } from "@/pages/postsNew";
import Diaries from "@/pages/diaries";
import MyPage from "@/pages/my-page";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/detail/:bookIsbn",
        element: <Detail />
      },
      {
        path: "/diaries/:diaryId",
        element: <Diaries />
      },
      {
        path: `/mybook/:userId`,
        element: <MyBook />
      },
      {
        path: "/mypage/:userId",
        element: <MyPage />
      },
      {
        path: "/search",
        element: <SearchResults />
      },
      {
        path: "/posts",
        element: <Posts />
      },
      {
        path: "/postsNew",
        element: <PostsNew />
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
