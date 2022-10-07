import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { ContentContext } from '../context/ContentProvider'
import CommentBox from './CommentBox'
import Feedback from './Feedback'



export default function Post(props){
  const { title, imgUrl, description, user: postUser, _id: postId, likes, index, comments } = props
  // const userId = localStorage.getItem("user")
  const { user: loggedInUser } = useContext(UserContext)
  const { deletePost, state, dispatch, setSinglePost, singlePost } = useContext(ContentContext)
  const [likeStatus, setLikeStatus] = useState("neutral")
  const [postStyle, setPostStyle] = useState("")
  const navigate = useNavigate() 
  const location = useLocation()

  //handle post display
  useEffect(() => {
    if (location === './single-post'){
      setPostStyle("full-post")
    } else {
      setPostStyle("compact-post")
    }
  }, [])

  //handle like status
  useEffect(()=>{
    if (likes?.includes(loggedInUser._id)){
      setLikeStatus("liked")
    } else {
      setLikeStatus("neutral")
    }
  }, [likes])
  
  function handleEdit(postId){
    let currentPost = state.posts.find(post => post._id === postId)
    dispatch({ type: 'setSinglePost', value: currentPost})
    dispatch({ type: 'edit'})
    navigate(`/edit-post`)
  }



  const userPost = (
    <> 
      <h4 className='post-title'>{title}</h4>
      <h5>{`By ${loggedInUser.username}`}</h5>
      {imgUrl && <img src={imgUrl} alt="user image" className="post-img" />}
      <p>{description}</p>
      <div className="edit-delete-box">
        <button onClick={() => handleEdit(postId)}>Edit</button>
        <button onClick={() => deletePost(postId)}>Delete</button>
      </div>
    </>
  )

  const otherPost = (
    <>
      <h4 className='post-title' >{title}</h4>
      {imgUrl && <img src={imgUrl} alt="user image" className="post-img"/>}
      <p>{description}</p>
    </>
  )

  
  return (
    <div className={postStyle} key={postId} >
      { loggedInUser._id === postUser ?
      userPost
      : otherPost
      }
      <Feedback postId={postId} key={postId} likes={likes} index={index} likeStatus={likeStatus} setLikeStatus={setLikeStatus} comments={comments}/>
    </div>

  )
}