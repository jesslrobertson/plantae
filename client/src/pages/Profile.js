import React, { useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import PostList from "../components/PostList"
import { ContentContext } from "../context/ContentProvider"
import { UserContext } from "../context/UserProvider"


export default function Profile(){
  const { 
    state,
    getUserPosts
  } = useContext(ContentContext)

  const {
    user: {
      username
    }
  } = useContext(UserContext)
  
  useEffect(()=> {
    getUserPosts()
  }, [])
  
  return(
    <div>
      <Link to='/new-post'>
        <button>New Post</button>
      </Link>
      <h2>Hello, {username}. Here are your posts: </h2>
      <PostList posts={state.posts} />

    </div>
  )
}