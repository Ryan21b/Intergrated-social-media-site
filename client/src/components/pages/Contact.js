import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import Typed from "react-typed";
import avatar from "../avatar3.jpg";
import { ContactMail, Phone } from "@material-ui/icons";

//CSS Styles
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

const Contact = () => {
  const classes = useStyles();
  return (
    <Box className={classes.typedContainer}>
      <Grid container justify="center">
        <Avatar className={classes.avatar} src={avatar} alt="PlaceHolder" />
      </Grid>

      <Typography className={classes.title} variant="h3">
        <Typed
          strings={["Ryan Barron", "Junior Developer"]}
          typeSpeed={40}
          loop
          backspeed={50}
        />
      </Typography>
      <br />
      <Typography className={classes.subtitle} variant="h4">
        <Box>
          <ContactMail />
          Email: barronryan65@gmail.com
        </Box>
      </Typography>
      <Typography className={classes.subtitle} variant="h4">
        <Box>
          <Phone />
          Cell No: 0649007584
        </Box>
      </Typography>
      <br />
    </Box>
  );
};
export default Contact;
