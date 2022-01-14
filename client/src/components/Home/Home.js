import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Grow,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

import { useDispatch } from "react-redux";
import { getPosts, getPostBySearch } from "../../actions/posts";

import useStyles from "./styles";

//get url data when user searches something
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home(props) {
  const [currentId, setCurrentId] = useState(null);
  //searched text by user is stored
  const [search, setSearch] = useState("");
  //tags added by user in input is stored in array
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();
  //call function which returns object with seached data in url 
  const query = useQuery();
  const history = useHistory();
  //store page and searched text in variables
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  //search: after pressing Enter key 
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      //search post
      searchPost();
    }
  };

  //tags: adding tags
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  //tags: removing tags
  const handleDelete = (tagDel) => {
    setTags(tags.filter((tag) => tag !== tagDel));
  };

  //button: after clicking search button dispatch data to redux
  const searchPost = () => {
    if (search.trim() || tags.length ) {
      //dispatch -> fetch searched posts, using actions in redux
      dispatch(getPostBySearch({ search, tags: tags.join(',')}))
      /*
        Fetching posts is not done from this url in frontend but
        we are manually passing api endpoint with user entered search 
        text and tags.
        Whats the use of changing url in frontend then?
        answer:- To send url to others 
      */
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.postGridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.searchPosts}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} variant="contained" color="primary">
                Search
              </Button>
            </AppBar>
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className={classes.postsPagination}>
              <Pagination page={page}/>
              </Paper>
            )} 
            <Form currentId={currentId} setCurrentId={setCurrentId} />     
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
