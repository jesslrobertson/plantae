import React, { useContext, useEffect } from 'react'
import Comment from './Comment'
import { ContentContext } from '../context/ContentProvider'

export default function CommentBox(){
  const { state } = useContext(ContentContext)
  const singlePost = state.dbSinglePost
  useEffect(() => {
    console.log(singlePost)
  }, [state])

  return (
    <div className="comment-container">
      <h3>Comments</h3>
      {singlePost.comments && singlePost.comments?.map(comment => <Comment {...comment} key={comment._id} postId={singlePost.postId} />)}
    </div>
  )
}