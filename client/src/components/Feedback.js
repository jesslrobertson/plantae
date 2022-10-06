import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ContentContext } from "../context/ContentProvider";
import { Link } from "react-router-dom";

export default function Feedback(props) {
  const { likePost, removeLike, state, singlePost, setSinglePost, getOnePost } =
    useContext(ContentContext);
  const { postId, index, likeStatus, comments, likes } = props;

  let commentTotal = comments?.length

  // function handleSinglePost(postId) {
  //   let currentPost = state.posts.find((post) => post._id === postId);
  //   setSinglePost(currentPost);
  // }

  function handleSinglePost(postId) {
    getOnePost(postId)
  }

  const location = useLocation();

  const singlePostView = (
    <div className="feedback-box">
      <button
        className={likeStatus == "liked" ? "liked" : "neutral"}
        onClick={
          likeStatus == "liked"
            ? () => removeLike(postId, likeStatus)
            : () => likePost(postId, likeStatus)
        }
      >
        {singlePost?.likes?.length} like
      </button>
      <h5>{comments?.length} Comments</h5>
      {/* {location.pathname != "/single-post" && (
        <Link to={`/single-post/${singlePost._id}`} className='link-element'>
          <button onClick={() => handleSinglePost(postId)}>Add Comment</button>
        </Link>
      )} */}
    </div>
  );

  const listView = (
    <div className="feedback-box">
      <button
        className={likeStatus == "liked" ? "liked" : "neutral"}
        onClick={
          likeStatus == "liked"
            ? () => removeLike(postId, likeStatus)
            : () => likePost(postId, likeStatus)
        }
      >
        {state.posts[index]?.likes?.length} like
      </button>
      <Link to={`/single-post/${postId}`} className="link-element">
        <div
          className="feedback-comments"
          onClick={() => handleSinglePost(postId)}
        >
          <h6>{commentTotal} Comments</h6>
        </div>
      </Link>
    </div>
  );

  return <>{location.pathname != "/single-post" ? listView : singlePostView}</>;
}
