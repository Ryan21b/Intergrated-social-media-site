import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import Typed from "react-typed";
import avatar from "../logo.png";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: theme.spacing(1),
  },
  title: {
    color: "white",
  },
  subtitle: {
    color: "white",
    marginBottom: "3rem",
  },
  typedContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    textAlign: "center",
    zIndex: 1,
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.typedContainer}>
        <Grid container justify="center">
          <Avatar className={classes.avatar} src={avatar} alt="PlaceHolder" />
        </Grid>

        <Typography className={classes.title} variant="h3">
          <Typed
            strings={[
              "Upswipes central",
              "Version: 1.1",
              "Created by: Ryan Barron",
            ]}
            typeSpeed={40}
            loop
            backspeed={50}
          />
        </Typography>
        <br />
        <Typography className={classes.subtitle} variant="h4">
          <Typed
            strings={["Stay Tuned as the Journey continues"]}
            typeSpeed={40}
            backspeed={60}
            loop
          />
        </Typography>
      </Box>
      <Box></Box>
    </>
  );
};
export default About;
