import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContentContext } from '../context/ContentProvider'

const initInputs = {
  title: "",
  description: "",
  imgUrl: ""
}

export default function PostForm(props){
  const { addPost, editPost, dispatch, state, singlePost } = useContext(ContentContext)
  const [inputs, setInputs] = useState(initInputs)
  const navigate = useNavigate()

  useEffect(() => {
    if (state.edit === true){
      setInputs({
        title: singlePost.title,
        description: singlePost.description,
        imgUrl: singlePost.imgUrl 
      })
    }
  }, [])


  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    if (state.edit === false){
      addPost(inputs)
    } else {
      editPost(singlePost._id, inputs)
      dispatch({ type: 'edit'})
    }
    setInputs(initInputs)
    navigate(-1)
  }

  const { title, description, imgUrl } = inputs
  return (
    <div>
      <form onSubmit={handleSubmit} className="post-form">
        <input 
          type="text" 
          name="title" 
          value={title} 
          onChange={handleChange} 
          placeholder="Title"/>
        <input
          type="text" 
          name="description" 
          value={description} 
          onChange={handleChange} 
          placeholder="Content"
          className="post-content"
          />
        <input 
          type="text" 
          name="imgUrl" 
          value={imgUrl} 
          onChange={handleChange} 
          placeholder="Image Url"/>
        <button>Submit</button>
      </form>
    </div>
  )
}