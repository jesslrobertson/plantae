import React, { useReducer, useState } from "react";
import { useLocation } from 'react-router-dom'
import axios from "axios";

export const ContentContext = React.createContext();
const contentAxios = axios.create();

contentAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function ContentProvider(props) {
  const location = useLocation().pathname
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    posts: [
      {
        _id: "",
        title: "",
        imgUrl: "",
        description: "",
        user: "",
        comments: [],
        likes: [],
        timestamp: "",
        __v: 0,
      },
    ],
    message: "",
    edit: false,
    currentPost: {},
  };

  const [state, dispatch] = useReducer(contentReducer, initState);

  const [singlePost, setSinglePost] = useState();

  function contentReducer(state, action) {
    let newState;
    const prevPosts = [...state.posts];
    switch (action.type) {
      case "getPosts":
        newState = {
          ...state,
          posts: action.value,
          order: action.order,
        };
        break;
      case "getOnePost":
        newState = {
          ...state,
          currentPost: action.value,
        };
        break;
      case "appendPosts":
        newState = {
          ...state,
          posts: [...state.posts, action.value],
        };
        break;
      case "removePost":
        newState = {
          ...state,
          posts: action.value,
        };
        break;
      case "updatePosts":
        const updatedPostIndex = prevPosts.findIndex(
          (post) => post._id === action.value._id
        );
        prevPosts[updatedPostIndex] = action.value;
        newState = {
          ...state,
          posts: prevPosts,
        };
        break;
      case "setSinglePost":
        newState = {
          ...state,
          currentPost: action.value,
        };
        break;
      case "addComment":
        newState = {
          ...state,
          currentPost: {
            ...state.currentPost,
            comments: action.value,
          },
        };
        break;
      case "removeComment":
        newState = {
          ...state,
          currentPost: {
            ...state.currentPost,
            comments: action.value,
          },
        };
        break;
      case "edit":
        newState = {
          ...state,
          edit: true,
        };
        break;
      default:
        throw new Error();
    }
    return newState;
  }

  function getUserPosts() {
    console.log("get user posts called");
    contentAxios
      .get("/api/post/user")
      .then((res) => {
        dispatch({ type: "getPosts", value: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function getAllPosts() {
    contentAxios
      .get("/api/post/")
      .then((res) => {
        dispatch({ type: "getPosts", value: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function getOnePost(postId) {
    console.log("get one post called");
    console.log(postId);
    contentAxios
      .get(`/api/post/singlePost/${postId}`)
      .then((res) => {
        console.log(res.data[0]);
        dispatch({ type: "getOnePost", value: res.data[0] });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function addPost(newPost) {
    console.log(newPost);
    contentAxios
      .post("/api/post", newPost)
      .then((res) => {
        dispatch({ type: "appendPosts", value: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function deletePost(postId) {
    contentAxios
      .delete(`/api/post/${postId}`)
      .then((res) => {
        const freshPosts = state.posts.filter((post) => post._id !== postId);
        console.log(freshPosts);
        dispatch({ type: "removePost", value: freshPosts });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function editPost(postId, editedPost) {
    contentAxios
      .put(`/api/post/${postId}`, editedPost)
      .then((res) => {
        dispatch({ type: "updatePosts", value: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function likePost(postId) {
    console.log("adding like");
    contentAxios
      .put(`/api/post/like/${postId}`)
      .then((res) => {
        location === (`/single-post/${postId}`)
        ? dispatch({ type: 'setSinglePost', value: res.data })
        : dispatch({ type: "updatePosts", value: res.data })
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function removeLike(postId) {
    console.log("removing like");
    contentAxios
      .put(`/api/post/removeLike/${postId}`)
      .then((res) => {
        location === (`/single-post/${postId}`)
        ? dispatch({ type: 'setSinglePost', value: res.data })
        : dispatch({ type: "updatePosts", value: res.data })
      })
      .catch((err) => console.log(err.reponse.data.errMsg));
  }

  function addComment(newComment, postId) {
    console.log(newComment);
    contentAxios
      .post(`/api/comment/${postId}`, newComment)
      .then((res) => {
        console.log("res from comment update");
        console.log(res.data);
        dispatch({
          type: "addComment",
          value: res.data.comments,
        });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function deleteComment(postId, commentId) {
    console.log("comment Id");
    console.log(commentId);
    contentAxios
      .delete(`/api/comment/${postId}/${commentId}`)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "removeComment",
          value: res.data.comments,
        });
      })
      .catch((err) => {
        console.log(err.response.data.errMsg);
      });
  }

  return (
    <ContentContext.Provider
      value={{
        state,
        dispatch,
        getUserPosts,
        getAllPosts,
        getOnePost,
        addPost,
        deletePost,
        likePost,
        removeLike,
        addComment,
        singlePost,
        setSinglePost,
        deleteComment,
        editPost,
      }}
    >
      {props.children}
    </ContentContext.Provider>
  );
}
