import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Card, Grid, Typography, TextField, Button } from "@material-ui/core";
import { ImageSharp, Send } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

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
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Holder " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          image: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error });
          } else {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            M.toast({ html: "Post created succesfully" });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const PostDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Upswipes");
    data.append("cloud_name", "upswipes");
    fetch("https://api.cloudinary.com/v1_1/upswipes/image/upload", {
      method: "Post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={body}
            onChange={(e) => setBody(e.target.value)}
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
            <InputField
              input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ display: "none" }}
            />
          </Button>

          <br></br>
          <Button
            variant="outlined"
            color="primary"
            component="label"
            className={classes.subtitle2}
            onClick={() => PostDetails()}
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
