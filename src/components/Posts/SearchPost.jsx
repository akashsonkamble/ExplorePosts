import React, { useState } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import { useDispatch } from "react-redux";
import { searchPosts } from "../../store/post-slice";
import classes from "./SearchPost.module.css";

const SearchPost = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (search === "") {
      return alert("Please provide a value");
    }
    dispatch(searchPosts(search));
    onSearch(search);
    setSearch("");
  };

  return (
    <Card>
      <form onSubmit={formSubmitHandler}>
        <h3>Search Post</h3>
        <div className={classes["form-control"]}>
          <input
            type="text"
            placeholder="Search for a post"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Card>
  );
};

export default SearchPost;
