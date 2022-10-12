import React, { useContext, useEffect } from "react";
import PostList from "../components/PostList";
import { ContentContext } from "../context/ContentProvider";
import { UserContext } from "../context/UserProvider";
import UserAvatar from "../components/UserAvatar";

export default function Profile() {
  const { state, getUserPosts } = useContext(ContentContext);

  const {
    user: { username },
  } = useContext(UserContext);

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <div className="profile-page">
      <UserAvatar name={username} size={40} />
      <PostList posts={state.posts} />
    </div>
  );
}
