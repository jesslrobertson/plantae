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
    <div className='profile-page'>
      <h4>Hello, {username}. Here are your posts: </h4>
      <PostList posts={state.posts} />

    </div>
  )
}