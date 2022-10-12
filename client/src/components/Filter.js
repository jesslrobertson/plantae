import React from 'react'
import TagButton from './TagButton';

export default function Filter(props){
  const { tags, postArray, setFilteredPosts } = props;

  function tagFilter(postArray, property){
    console.log('filter function called')
    const postsByTag = postArray.filter(post => post.tag === property)
    setFilteredPosts(postsByTag)
  }


  return (
    <div className='filter-box'>
      <h6>Filter:</h6>
      <h6 className={`post-tag all-posts filter`}>All Posts</h6>
      {tags?.map((tag, index) => (
        <TagButton 
          tag={tag} 
          tagFilter={tagFilter}
          postArray={postArray}
          key={index}
        />
      ))}
    </div>
  )
}