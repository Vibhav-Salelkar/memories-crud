import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";

function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const [loading, setLoading] = useState(false);
  const post = useSelector((state) => {
    // @ts-ignore
    return currentId
      ? state.posts.posts.find((post) => post._id === currentId)
      : null;
  });
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    }
    clear();
  };

  const handleImg = (file) => {
    setLoading(true);
    if (file === undefined) {
      return;
    }
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      let data = new FormData();
      data.append("upload_preset", "vchatapp");
      data.append("file", file);
      data.append("cloud_name", "dwnabprdz");
      fetch("https://api.cloudinary.com/v1_1/dwnabprdz/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPostData({ ...postData, selectedFile: data.url.toString() });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setLoading(false);
      console.log("error");
    }
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create posts.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={6} className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {" "}
          {currentId ? "Editing" : "Creating"} a Post
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          {/* <FileBase
                        type = "file"
                        multiple ={false}
                        onDone= {({base64}) => setPostData({ ...postData, selectedFile: base64})}
                    /> */}
          <input
            type="file"
            accept="image/*"
            name="img"
            onChange={(e) => handleImg(e.target.files[0])}
          />
        </div>
        {loading ? (
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Uploading...
          </Button>
        ) : (
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        )}

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
