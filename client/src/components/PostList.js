import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { ContentContext } from "../context/ContentProvider";

export default function PostList(props) {
  const { state } = useContext(ContentContext);
  console.log(state.posts)

  return (
    <div>
      {state?.posts?.map((post, index) => (
        <Post {...post} key={post._id} id={post._id} index={index} />
      ))}
    </div>
  );
};
