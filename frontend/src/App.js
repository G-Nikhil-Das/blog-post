import Header from "./components/Header";
import AllBlogs from "./components/AllBlogs";
import MyBlogs from "./components/MyBlogs";
import BlogDetails from "./components/BlogDetails";
import AddBlog from "./components/AddBlog";
import Login from "./components/Login";

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Register from "./components/Register";
// import { authActions } from "./store";
function App() {
  // const dispath = useDispatch();

  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isLoggedIn = false;
  console.log(isLoggedIn);
  // useEffect(() => {
  //   if (localStorage.getItem("userId")) {
  //     dispath(authActions.login());
  //   }
  // }, [dispath]);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<AllBlogs />} />
            </>
          ) : (
            <>
              <Route path="/blogs" element={<AllBlogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<MyBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetails />} />
              {/* <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> */}
              <Route path="/" element={<AllBlogs />} />{" "}
            </>
          )}
          
        </Routes>
      </main>
    </>
  );
}

export default App;