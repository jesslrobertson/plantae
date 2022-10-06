import React, { useContext } from 'react'
import { ContentContext } from '../context/ContentProvider'
import Post from "../components/Post"
import CommentForm from '../components/CommentForm'
import CommentBox from '../components/CommentBox'

export default function SinglePost(props){
  const { singlePost } = useContext(ContentContext)
  console.log( singlePost)

  return(
    <div className="single-post">
      < Post {...singlePost} key={singlePost._id} id={singlePost._id} /> 
      <CommentForm postId={singlePost._id} />
      <CommentBox {...singlePost.comments} />
    </div>
  )
}