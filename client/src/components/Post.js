import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { ContentContext } from '../context/ContentProvider'
import Feedback from './Feedback'



export default function Post(props){
  const { title, imgUrl, description, tag, user: postUser, _id: postId, likes, index, comments } = props
  const { user: loggedInUser } = useContext(UserContext)
  const { deletePost, state, dispatch } = useContext(ContentContext)
  const [likeStatus, setLikeStatus] = useState("neutral")
  const [postStyle, setPostStyle] = useState("")
  const [userControls, setUserControls] = useState("false")
  const navigate = useNavigate() 
  const location = useLocation()

  function handleUserControls(){
    setUserControls(prev => !prev)
  }

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

  function handleTags(string){
    return string.split("-").join(" ")
  }



  const userPost = (
    <> 
      {imgUrl && <img src={imgUrl} alt="user image" className="post-img" />}
      <div className='post-content'>
        {location == "./single-post" && <p>{description}</p>}
        <div className="edit-delete-box">
          <button onClick={() => handleEdit(postId)}>Edit</button>
          <button onClick={() => deletePost(postId)}>Delete</button>
        </div>
      </div>
    </>
  )

  const otherPost = (
    <>
      {imgUrl && <img src={imgUrl} alt="user image" className="post-img"/>}
      {location == "./single-post" && <p>{description}</p>}
    </>
  )

  
  return (
    <div className={postStyle} key={postId} >
      <div className='post-upper'>
        <div className='post-intro'>
          <h5 className='post-title'>{title}</h5>
          <h6 className='post-author'>{`By ${loggedInUser.username}`}</h6>
        </div>
        {tag && <span className={`post-tag ${tag}`}>{handleTags(tag)}</span>}
      </div>
      { loggedInUser._id === postUser ?
      userPost
      : otherPost
      }
      <Feedback postId={postId} key={postId} likes={likes} index={index} likeStatus={likeStatus} setLikeStatus={setLikeStatus} comments={comments}/>
    </div>

  )
}