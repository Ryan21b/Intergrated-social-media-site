import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { Grid } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import img1 from "./back9.jpg";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: "26px auto",
  },
  media: {
    width: 400,
    height: 100,
    paddingTop: "100%",
  },
  card: {},
  avatar: {
    backgroundColor: red[500],
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

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container justify="left">
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="Testimonial" className={classes.avatar}>
                R
              </Avatar>
            }
            action={<IconButton aria-label="settings"></IconButton>}
            title="Ryan Barron"
          />
          <CardMedia
            className={classes.media}
            image={img1}
            title="Lecturer"
            height="350"
          />
          <CardContent>
            <Typography paragraph>Profile picture</Typography>
            <Typography paragraph></Typography>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <Typography paragraph>A night sky</Typography>
            <InputField
              fullWidth={true}
              label="Comment"
              name="sender_message"
              variant="standard"
              margin="dense"
              size="medium"
              required
            />
          </CardContent>
        </Card>
        <IconButton
          aria-label="Create post"
          a
          href="/createpost"
          color="primary"
          position="static"
        >
          <AddIcon />
          <Typography>Create Post</Typography>
        </IconButton>
      </Grid>
      <IconButton
        aria-label="Create post"
        a
        href="/createpost"
        color="primary"
        position="static"
      >
        <AddIcon a href="/createpost" />
        <Typography>Create Post</Typography>
      </IconButton>
    </>
  );
};

export default Home;
