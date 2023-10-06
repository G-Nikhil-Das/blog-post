import React, { useState } from "react";
import { AppBar, Typography, Toolbar, Box, Button, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "../store";
// import { useStyles } from "./utils";
const Header = () => {
//   const classes = useStyles();
  // const dispath = useDispatch();
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [value, setValue] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
              value={isLoggedIn? value : 0}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                className="font-sans text-slate-950"
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
              />
              {isLoggedIn && (
                <Tab
                  // disabled={isLoggedIn? false : true}
                  className="font-sans text-slate-950"
                  LinkComponent={Link}
                  to="/myBlogs"
                  label="My Blogs"
                />
              )}
              {isLoggedIn && (
                <Tab
                  // disabled={isLoggedIn? false : true}
                  className="font-sans text-slate-950"
                  LinkComponent={Link}
                  to="/blogs/add"
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
                onClick={()=>{setIsLoggedIn(true)}} //Mock line
                LinkComponent={Link}
                // to="/login"
                to="/blogs" //mockline
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                className="bg-neutral-950"
              >
                Login
              </Button>
              <Button
                onClick={()=>{setIsLoggedIn(true)}} //Mock line
                LinkComponent={Link}
                // to="/login"
                to="/blogs" //mockline
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
              // onClick={() => dispath(authActions.logout())}
              onClick={()=>{setIsLoggedIn(false)}} //Mock line
              LinkComponent={Link}
              // to="/login"
              to="/blogs" //mock line
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