import Header from "./components/Header";
import AllBlogs from "./components/AllBlogs";
import MyBlogs from "./components/MyBlogs";
import BlogDetails from "./components/BlogDetails";
import AddBlog from "./components/AddBlog";
import Login from "./components/Login";

import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./components/Register";
import EditBlog from "./components/EditBlog";
function App() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/register" element={<Register />} />
              <Route path="/user/" element={<AllBlogs />} />
              <Route path="/blog/getPosts" element={<AllBlogs />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/" element={<AllBlogs />} />{" "}
            </>
          ) : (
            <>
              <Route path="/blog/getPosts" element={<AllBlogs />} />
              <Route path="/blog/add" element={<AddBlog />} />
              <Route path="/blog/myBlogs" element={<MyBlogs />} />
              <Route path="/blog/edit/:id" element={<EditBlog />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/user/login" element={<Login />} />
              <Route path="/" element={<AllBlogs />} />{" "}
            </>
          )}
          
        </Routes>
      </main>
    </>
  );
}

export default App;