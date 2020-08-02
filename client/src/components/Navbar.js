import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BottomNavigationAction } from "@material-ui/core";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import Arrow from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      position: "left",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 4,
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <Button color="inherit" a href="/createpost">
          Create Post
        </Button>,
        <Button
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            history.push("/");
          }}
        >
          Logout
        </Button>,
      ];
    } else {
      return [
        <Button color="inherit" a href="/register">
          Register
        </Button>,
        <Button color="inherit" a href="/">
          Login
        </Button>,
        <Button color="inherit" a href="/about">
          About
        </Button>,
        <Button color="inherit" a href="/contact">
          Contact
        </Button>,
      ];
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="#222">
        <Toolbar>
          <BottomNavigationAction
            style={{ padding: "0", color: "#222" }}
            icon={<Arrow />}
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/");
            }}
          />

          <Typography className={classes.title} variant="h6">
            UPSWIPES
          </Typography>
          {renderList()}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Navbar;
