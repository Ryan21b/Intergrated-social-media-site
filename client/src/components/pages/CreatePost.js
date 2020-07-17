import React from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Card, Grid, Typography, TextField, Button } from "@material-ui/core";
import { ImageSharp, Send } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
  },
  subtitle: {
    marginBottom: "1rem",
  },
  subtitle1: {
    marginBottom: "2rem",
  },
  subtitle2: {
    marginLeft: "12rem",
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

const CreatePost = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container justify="center">
        <Card className={classes.root}>
          <Typography>Upswipes</Typography>
          <Typography>Create Post</Typography>
          <InputField
            className={classes.subtitle}
            fullWidth={true}
            label="Title"
            name="post_title"
            variant="standard"
            margin="dense"
            size="medium"
            required
          />
          <InputField
            className={classes.subtitle}
            fullWidth={true}
            label="Body"
            name="post_title"
            variant="standard"
            margin="dense"
            size="medium"
            required
          />

          <Button
            variant="contained"
            component="label"
            color="primary"
            className={classes.subtitle1}
          >
            <ImageSharp />
            <Typography>Upload image</Typography>
            <input type="file" style={{ display: "none" }} />
          </Button>
          <br></br>
          <Button
            variant="outlined"
            color="primary"
            component="label"
            className={classes.subtitle2}
          >
            <Send />
            <Typography>Submit Post</Typography>
          </Button>
        </Card>
      </Grid>
    </>
  );
};

export default CreatePost;
