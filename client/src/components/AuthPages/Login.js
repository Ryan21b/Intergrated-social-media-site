import React, { useState, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { TextField, Grid, Avatar } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";
import { Send } from "@material-ui/icons";
import { UserContext } from "../../App";
import avatar from "../logo.png";
import M from "materialize-css";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    height: "100%",
    margin: "3rem ",
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  title: {
    fontSize: 18,
    alignContent: "center",
    marginLeft: "10rem",
  },
  pos: {
    marginBottom: 12,
  },
}));
const InputField = withStyles({
  root: {
    "& lablel.Mui-focused": {
      color: "#222",
    },
    "& label": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "& Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);
const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const LogInfo = () => {
    fetch("/loginCoffin", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({ html: "Login successful" });
          history.push("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const classes = useStyles();

  return (
    <>
      <Grid container justify="center" height="">
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <Grid container justify="center">
              <Avatar
                className={classes.avatar}
                src={avatar}
                alt="Upswipe Logo"
              />
            </Grid>
            <Typography
              className={classes.title}
              color="textPrimary"
              gutterBottom
              justify="center"
            >
              Upswipes
            </Typography>
            <CardContent>
              <Typography variant="h6" component="h6" align="left">
                <InputField
                  fullWidth={true}
                  label="Email"
                  name="Email"
                  variant="standard"
                  margin="dense"
                  size="medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Typography>
              <Typography variant="h6" component="h6" align="left">
                <InputField
                  fullWidth={true}
                  type="password"
                  label="Password"
                  name="sender_message"
                  variant="standard"
                  margin="dense"
                  size="medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                contained
                size="medium"
                color="primary"
                centerRipple
                onClick={() => LogInfo()}
              >
                Login
                <Send />
              </Button>
            </CardActions>
            <CardActions>
              <Typography variant="h6" component="h6" align="center">
                <Link to="/register">Don't Have an account? </Link>
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
