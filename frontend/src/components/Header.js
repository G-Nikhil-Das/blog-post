import React, { useEffect, useState } from "react";
import { AppBar, Typography, Toolbar, Box, Button, Tabs, Tab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, setUserInfo, setValue } from '../store/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const tabsValue = useSelector((state) => state.auth.value)

  useEffect(() => {
    fetch('http://localhost:5000/user/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        dispatch(setUserInfo(userInfo))
        if(userInfo && userInfo.id) {
          dispatch(login())
        }
      });
    }).catch(err => {
      console.log(err)
    });
    navigate('/')
  }, []);

  return (
    <AppBar
      position="sticky"
      className="bg-neutral-300"
    >
      <Toolbar>
        <Typography className="font-sans text-slate-950" variant="h4">
          Blogs
        </Typography>
       
          <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs
              value={isLoggedIn? tabsValue : 0}
              onChange={(e, val) => dispatch(setValue({value: val}))}
            >
              <Tab
                className="font-sans text-slate-950"
                LinkComponent={Link}
                to="/blog/getPosts"
                label="All Blogs"
              />
              {isLoggedIn && (
                <Tab
                  // disabled={isLoggedIn? false : true}
                  className="font-sans text-slate-950"
                  LinkComponent={Link}
                  to="/blog/myBlogs"
                  label="My Blogs"
                />
              )}
              {isLoggedIn && (
                <Tab
                  // disabled={isLoggedIn? false : true}
                  className="font-sans text-slate-950"
                  LinkComponent={Link}
                  to="/blog/add"
                  label="Add Blog"
                />
                )}
            </Tabs>
          </Box>
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              {" "}
              <Button
                onClick={()=>{}}
                LinkComponent={Link}
                to="/user/login"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                className="bg-neutral-950"
              >
                Login
              </Button>
              <Button
                onClick={()=>{}}
                LinkComponent={Link}
                to="/user/register"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                className="bg-neutral-950"
              >
                Signup
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => {
                dispatch(setValue({value: 0}))
                dispatch(logout())
                dispatch(setUserInfo({}))
                fetch('http://localhost:5000/user/logout', {
                  credentials: 'include',
                  method: 'POST',
                });
              }}
              LinkComponent={Link}
              to="/"
              variant="contained"
              className="bg-neutral-950"
              sx={{ margin: 1, borderRadius: 10 }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;