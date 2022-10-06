import React, { useContext } from 'react'
import Comment from './Comment'
import { ContentContext } from '../context/ContentProvider'

export default function CommentBox(){
  const { singlePost } = useContext(ContentContext)

  return (
    <div className="comment-container">
      <h3>Comments</h3>
      {singlePost.comments && singlePost.comments.map(comment => <Comment {...comment} key={comment._id} postId={singlePost.postId} />)}
    </div>
  )
}