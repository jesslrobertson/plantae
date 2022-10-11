import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ContentContext } from "../context/ContentProvider";
import { Link } from "react-router-dom";
import Heart from "./Heart";
import {ReactComponent as SolidHeart } from '../assets/solid-heart.svg'
import {ReactComponent as LineHeart } from '../assets/line-heart.svg'

export default function Feedback(props) {
  const { likePost, removeLike, state, singlePost, setSinglePost, getOnePost } =
    useContext(ContentContext);
  const { postId, index, likeStatus, setLikeStatus, comments, likes } = props;

  let commentTotal = comments?.length;

  // function handleSinglePost(postId) {
  //   let currentPost = state.posts.find((post) => post._id === postId);
  //   setSinglePost(currentPost);
  // }

  function handleSinglePost(postId) {
    getOnePost(postId);
  }

  const location = useLocation();

  const likedHeart = (
    <SolidHeart
          likeStatus={likeStatus}
          className='liked-heart heart'
          onClick={
            likeStatus === "liked"
              ? () => removeLike(postId)
              : () => likePost(postId)
          }
        />
  )

  const neutralHeart = (
    <LineHeart
          likeStatus={likeStatus}
          className='neutral-heart heart'
          onClick={
            likeStatus === "liked"
              ? () => removeLike(postId)
              : () => likePost(postId)
          }
        />
  )

  const singlePostView = (
    <div className="feedback-box">
      <div className="like-box">
        <h6 className='like-number'>{singlePost?.likes?.length}</h6>
        {likeStatus === "liked"
        ? likedHeart
      : neutralHeart}
      </div>
      <h5 className='feedback-comments'>{comments?.length} Comments</h5>
      {/* {location.pathname != "/single-post" && (
        <Link to={`/single-post/${singlePost._id}`} className='link-element'>
          <button onClick={() => handleSinglePost(postId)}>Add Comment</button>
        </Link>
      )} */}
    </div>
  );

  const listView = (
    <div className="feedback-box">
      <div className='like-box'>
        <h6 className='like-number'>{likes?.length}</h6>
        {likeStatus === "liked"
          ? likedHeart
        : neutralHeart}
      </div>
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
