import React from "react";
import TagButton from "./TagButton";

export default function Filter(props) {
  const { tags, postArray, setFilteredPosts } = props;

  const uniqueTags = [...new Set(tags)];

  function tagFilter(postArray, property) {
    console.log("filter function called");
    const postsByTag = postArray.filter((post) => post.tag === property);
    setFilteredPosts(postsByTag);
  }

  return (
    <div className="filter-box">
      <div className="filter-list filter-box">
        <h6 className="filter-title">Filter:</h6>
        <h6
          className={`post-tag all-posts filter`}
          onClick={() => setFilteredPosts()}
        >
          all posts
        </h6>
        {uniqueTags?.map((tag, index) => (
          <TagButton
            tag={tag}
            tagFilter={tagFilter}
            postArray={postArray}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
