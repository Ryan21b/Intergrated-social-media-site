import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";

import SendIcon from "@material-ui/icons/SendOutlined";
import M from "materialize-css";

import { useHistory } from "react-router-dom";
import { ImageSharp } from "@material-ui/icons";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (url) {
      fetch("/createpostCoffin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Holder " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          img: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error });
          } else {
            M.toast({
              html: "Created post Successfully",
            });
            history.push("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const Coffinpost = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Upswipes");
    data.append("cloud_name", "upswipes");
    fetch("https://api.cloudinary.com/v1_1/upswipes/image/upload", {
      method: "post",
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
    subtitle1: {
      marginBottom: "1rem",
    },
    subtitle2: {
      marginBottom: "2rem",
    },
    subtitle3: {
      marginBottom: "2rem",
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
  const classes = useStyles();
  return (
    <>
      <Box component="div" className={classes.root}>
        <Grid container justify="center">
          <Box>
            <Card>
              <Typography
                variant="h5"
                style={{
                  color: "black",
                  textAlign: "center",

                  textTransform: "uppercase",
                }}
              >
                Create Post
              </Typography>
              <InputField
                fullWidth={true}
                label="Title"
                variant="standard"
                name="post_title"
                margin="dense"
                size="medium"
                className={classes.subtitle1}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <InputField
                fullWidth={true}
                label="Body"
                name="post_body"
                variant="standard"
                margin="dense"
                size="medium"
                className={classes.subtitle1}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
              <Button
                variant="contained"
                component="label"
                color="primary"
                className={classes.subtitle2}
              >
                <ImageSharp />
                <Typography>Upload Image</Typography>
                <InputField
                  input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </Button>

              <Button
                type="submit"
                variant="outlined"
                fullWidth={true}
                component="label"
                endIcon={<SendIcon />}
                onClick={() => Coffinpost()}
              >
                Submit
              </Button>
            </Card>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default CreatePost;
