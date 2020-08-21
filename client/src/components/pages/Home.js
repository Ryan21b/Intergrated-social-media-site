import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import {
  Grid,
  BottomNavigationAction,
  BottomNavigation,
  Button,
} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Delete from "@material-ui/icons/Delete";
import Logo from "../logo.png";

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
  button: {
    "&:click": {
      fill: "red",
      fontSize: "1.8rem",
    },
  },
}));

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/allpostsCoffin", {
      headers: {
        Authorization: "Holder " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  const classes = useStyles();
  function LabelBottomNavigation() {
    const [value, setValue] = React.useState("recents");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  }
  const [value, setValue] = React.useState("recents");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return data.map((item) => {
    return (
      <>
        <Grid container justify="left">
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="Upswipes Logo"
                  className={classes.avatar}
                  src={Logo}
                ></Avatar>
              }
            />
            <Typography variant="h6" align="center">
              {item.username}
            </Typography>
            <CardMedia
              className={classes.media}
              image={item.photo}
              height="350"
              width="450"
            />
            <BottomNavigation value={value} onChange={handleChange}>
              <BottomNavigationAction
                label="Like"
                value="favorites"
                icon={<FavoriteIcon />}
              />
            </BottomNavigation>
            <Typography variant="h6" align="center">
              {item.title}
            </Typography>
            <Typography paragraph align="center">
              {item.body}
            </Typography>
            <Button onClick={() => deletePost(item._id)}>
              <Delete />
              Delete Post
            </Button>
          </Card>
        </Grid>
      </>
    );
  });
};

export default Home;
