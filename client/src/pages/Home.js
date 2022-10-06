import React, { useContext, useEffect }from 'react'
import { ContentContext } from '../context/ContentProvider'
import PostList from '../components/PostList'

export default function Home(){

  const { getAllPosts } = useContext(ContentContext)

  useEffect(() => {
    getAllPosts()
  }, [])



  
  return (
    <div>
      <h2>All Posts</h2>
      <PostList />
    </div>
  )
}