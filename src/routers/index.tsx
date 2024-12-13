import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../index.css";

import Layout from "../components/layout/Layout";
import Home from "@/pages/home/";
import Login from "@/pages/login";
import MyBook from "@/pages/my-book";
import Posts from "@/pages/posts";
import Detail from "@/pages/detail";
import PostsNew from "@/pages/postsNew";
import Landing from "@/pages/Landing";
import Search from "@/pages/search";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="mybook" element={<MyBook />} />
          <Route path="detail" element={<Detail />} />
          <Route path="postsNew" element={<PostsNew />} />
          <Route path="posts" element={<Posts />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
