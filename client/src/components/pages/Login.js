import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { TextField, Grid } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Register from "./Register";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: "100%",
    margin: "3rem ",
  },

  title: {
    fontSize: 14,
    alignContent: "left",
  },
  pos: {
    marginBottom: 12,
  },
});
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
  const classes = useStyles();

  return (
    <>
      <Grid container justify="center" height="">
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Upswipes
              </Typography>
              <Typography variant="h6" component="h6" align="left">
                Email:
                <InputField
                  fullWidth={true}
                  label="Email"
                  name="sender_message"
                  variant="outlined"
                  margin="dense"
                  size="medium"
                  required
                />
              </Typography>
              <Typography variant="h6" component="h6" align="left">
                Password:
                <InputField
                  fullWidth={true}
                  label="Password"
                  name="sender_message"
                  variant="outlined"
                  margin="dense"
                  size="medium"
                  required
                />
              </Typography>
            </CardContent>
            <CardActions>
              <Button contained size="medium" color="primary" centerRipple>
                Login
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
