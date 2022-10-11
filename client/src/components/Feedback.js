import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ContentContext } from "../context/ContentProvider";
import { Link } from "react-router-dom";
import Heart from "./Heart";
import {ReactComponent as SolidHeart } from '../assets/solid-heart.svg'
import {ReactComponent as LineHeart } from '../assets/line-heart.svg'

export default function Feedback(props) {
  const { likePost, removeLike, state, singlePost, getOnePost } =
    useContext(ContentContext);
  const { postId, likeStatus, comments, likes } = props;

  

  let commentTotal = comments?.length;

  function handleSinglePost(postId) {
    getOnePost(postId);
  }

  const location = useLocation();

  const likedHeart = (
    <SolidHeart
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
      <h5 className='feedback-comments'>{commentTotal} Comments</h5>
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
