import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import { ContentContext } from "../context/ContentProvider"

export default function Comment(props){
  const { user }  = useContext( UserContext )
  const { deleteComment, singlePost, state } = useContext( ContentContext)
  const { comment, author, _id: commentId } = props

  const postId = state.dbSinglePost._id

  const ownComment = (
    <>
      <h5>{ author.username }</h5>
      <p>{ comment }</p>
      <div>
        <button onClick={() => deleteComment(postId, commentId )}>Delete</button>
      </div>
    </>
  )

  const otherComment = (
    <>
      <h5>{ author.username }</h5>
      <p>{ comment }</p>
    </>
  )


  
  return(
    <div className='single-comment-box'>
      {user._id === author._id
      ? ownComment
      : otherComment
      }
    </div>
  )
}