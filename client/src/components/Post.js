import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
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
    id: postId,
    likes,
    index,
    comments,
  } = props;
  console.log(props)
  const { user: loggedInUser } = useContext(UserContext);
  const { deletePost, state, dispatch, handleSinglePost } =
    useContext(ContentContext);
  const [likeStatus, setLikeStatus] = useState("neutral");
  const [postStyle, setPostStyle] = useState();
  const [userControls, setUserControls] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  function toggleControls() {
    setUserControls((prev) => !prev);
  }

  console.log('post user')
  console.log(postUser)
  console.log('loggedInUser')
  console.log(loggedInUser)

  const showUserControls = (
    <>
      <button onClick={() => handleEdit(postId)}>Edit</button>
      <button onClick={() => deletePost(postId)}>Delete</button>
      <span onClick={toggleControls}>X</span>
    </>
  );

  const hideUserControls = (
    <>
      <MenuDots onClick={toggleControls} />
    </>
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
    console.log("dispatched setSinglePost");
    dispatch({ type: "edit" });
    console.log("dispatched edit");
    navigate(`/edit-post`);
  }

  function handleTags(string) {
    return string.split("-").join(" ");
  }

  return (
    <div className={`${postStyle} post`} key={postId}>
      <div className={`post-upper ${postStyle}`}>
        <Link
          to={`/single-post/${postId}`}
          className={`link-element post-upper`}
        >
          <div
            className={`post-intro ${postStyle}`}
            onClick={() => handleSinglePost(postId)}
          >
            <UserAvatar name={postUser?.username} size={avatarSize} />
            <h5 className="post-title">{title}</h5>
            {tag && <h6 className={`post-tag ${tag}`}>{handleTags(tag)}</h6>}
          </div>
            </Link>
          <div className="edit-delete-box">
          {loggedInUser?._id === postUser?._id && 
            userControls ? showUserControls : hideUserControls
          }
          </div>
      </div>
      <div className={`post-content ${postStyle}`}>
        {imgUrl && (
          <Link to={`/single-post/${postId}`} className={`link-element`}>
            <img
              src={imgUrl}
              alt="user image"
              className={`post-img ${postStyle}`}
              onClick={() => handleSinglePost(postId)}
            />
          </Link>
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
