import React, { useContext, useEffect } from 'react'
import Comment from './Comment'
import { ContentContext } from '../context/ContentProvider'

export default function CommentBox(){
  const { state } = useContext(ContentContext)
  const currentPost = state.currentPost

  return (
    <div className="comment-container">
      <h4>Comments</h4>
      {currentPost.comments && currentPost.comments?.map(comment => <Comment {...comment} key={comment._id} postId={currentPost.postId} />)}
    </div>
  )
}