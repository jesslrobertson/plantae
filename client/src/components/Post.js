import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { ContentContext } from "../context/ContentProvider";
import { ReactComponent as MenuDots } from "../assets/MenuDots.svg";
import Feedback from "./Feedback";
import UserAvatar from "./UserAvatar";

export default function Post(props) {
  const {
    title,
    imgUrl,
    description,
    tag,
    user: postUser,
    _id: postId,
    likes,
    index,
    comments,
  } = props;
  const { user: loggedInUser } = useContext(UserContext);
  const { deletePost, state, dispatch, handleSinglePost } = useContext(ContentContext);
  const [likeStatus, setLikeStatus] = useState("neutral");
  const [postStyle, setPostStyle] = useState();
  const [userControls, setUserControls] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  function toggleControls() {
    setUserControls((prev) => !prev);
  }

  console.log(postId)

  const showUserControls = (
    <div className="edit-delete-box">
      <button onClick={() => handleEdit(postId)}>Edit</button>
      <button onClick={() => deletePost(postId)}>Delete</button>
      <span onClick={toggleControls}>X</span>
    </div>
  );

  const hideUserControls = (
    <div className="edit-delete-box">
      <MenuDots onClick={toggleControls} />
    </div>
  );

  //handle post display
  useEffect(() => {
    location === `/single-post/${postId}`
      ? setPostStyle("full-post")
      : setPostStyle("compact-post");
  }, [location]);

  const avatarSize = postStyle === "full-post" ? 40 : 30;

  //handle like status
  useEffect(() => {
    if (likes?.includes(loggedInUser._id)) {
      setLikeStatus("liked");
    } else {
      setLikeStatus("neutral");
    }
  }, [likes]);

  function handleEdit(postId) {
    let currentPost = state.posts.find((post) => post._id === postId);
    dispatch({ type: "setSinglePost", value: currentPost });
    dispatch({ type: "edit" });
    navigate(`/edit-post`);
  }

  function handleTags(string) {
    return string.split("-").join(" ");
  }

  return (
    <div className={`${postStyle} post`} key={postId}>
      <div className={`post-upper ${postStyle}`}>
        <div className="post-intro" onClick={() => {
          handleSinglePost(postId)
          navigate(`/single-post/${postId}`)}}
          >
          <UserAvatar name={postUser?.username} size={avatarSize} />
          <h5 className="post-title">{title}</h5>
          {tag && <h6 className={`post-tag ${tag}`}>{handleTags(tag)}</h6>}
        </div>
        {loggedInUser._id === postUser._id && (
          <>{userControls ? showUserControls : hideUserControls}</>
        )}
      </div>
      <div className={`post-content ${postStyle}`}>
        {imgUrl && (
          <img
            src={imgUrl}
            alt="user image"
            className={`post-img ${postStyle}`}
            onClick={() => navigate(`/single-post/${postId}`)}
          />
        )}
        {location === `/single-post/${postId}` && (
          <p className="post-description">{description}</p>
        )}
      </div>
      <Feedback
        postId={postId}
        key={postId}
        likes={likes}
        index={index}
        likeStatus={likeStatus}
        setLikeStatus={setLikeStatus}
        comments={comments}
      />
    </div>
  );
}
