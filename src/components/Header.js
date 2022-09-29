import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Tab,
  Tabs,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const dispath =useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(to bottom, #669999 0%, #66ccff 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h4">BlogsApp</Typography>

        {isLoggedIn && <Box display="flex" marginLeft={"auto"} marginRight="auto">
          <Tabs
            textColor="inherit"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
            <Tab LinkComponent={Link} to="/myBlogs" label="My BLogs" />
            <Tab LinkComponent={Link} to="/blogs/add" label="Add BLogs" />
          </Tabs>
        </Box>}

        <Box display="flex" marginLeft="auto">
          { !isLoggedIn && <> <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning"
          >
            Login
          </Button>

          <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning"
          >
            SignUp
          </Button> </>
          }

          { isLoggedIn && <Button
          onClick={()=>dispath(authActions.logout())}
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning"
          >
            Logout
          </Button>}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
