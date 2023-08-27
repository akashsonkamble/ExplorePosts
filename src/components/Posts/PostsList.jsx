import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/post-slice";
import SearchPost from "./SearchPost";
import classes from "./PostsList.module.css";

const PostsList = () => {
  const dispatch = useDispatch();

  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const { loading, error, posts, searchResults } = useSelector(
    (state) => state.posts
  );

  const displayPosts = hasSearched ? searchResults : posts;

  const isNoPostsFound = !loading && !searchResults.length && hasSearched;

  const searchInputHandler = () => {
    setHasSearched(true);
  };

  useEffect(() => {
    if (isNoPostsFound) {
      alert("No post found.");
      setHasSearched(false);
    }
  }, [isNoPostsFound]);

  return (
    <>
      <SearchPost onSearch={searchInputHandler} />
      {loading ? <p>Loading...</p> : null}
      {error ? <p>{error}</p> : null}
      {displayPosts.length > 0 && (
        <>
          <h1>Total Posts: {displayPosts.length}</h1>
          <ul className={classes["post-list"]}>
            {displayPosts.map((post) => (
              <li key={post.id} className={classes["post-item"]}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default PostsList;
