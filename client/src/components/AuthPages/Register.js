import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { TextField, Grid, Avatar } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";
import { Send } from "@material-ui/icons";
import avatar from "../logo.png";

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
    fontSize: 14,
    alignContent: "left",
  },
  pos: {
    marginBottom: 12,
  },
  toast: {
    position: "top",
    color: "green",
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

const Register = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const RegInfo = () => {
    fetch("/registerCoffin", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          history.push("/");
        } else {
          history.push("/");
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
            <Grid container justify="center">
              <Typography color="textPrimary" gutterBottom>
                Upswipes
              </Typography>
            </Grid>
            <CardContent>
              <Typography variant="h6" component="h6" align="left">
                Full Name:
                <InputField
                  fullWidth={true}
                  label="Full Name"
                  name="User_name"
                  variant="outlined"
                  margin="dense"
                  size="medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Typography>
              <Typography variant="h6" component="h6" align="left">
                Email:
                <InputField
                  fullWidth={true}
                  label="Email"
                  type="email"
                  name="User_email"
                  variant="outlined"
                  margin="dense"
                  size="medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Typography>
              <Typography variant="h6" component="h6" align="left">
                Password:
                <InputField
                  fullWidth={true}
                  label="Password"
                  type="password"
                  name="User_password"
                  variant="outlined"
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
                onClick={() => RegInfo()}
              >
                Register
                <Send />
              </Button>
            </CardActions>
            <CardActions>
              <Typography variant="h6" component="h6" align="center">
                <Link to="/">Already Have an account? </Link>
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
