import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContentContext } from "../context/ContentProvider";

const initInputs = {
  title: "",
  description: "",
  imgUrl: "",
  tag: ""
};

export default function PostForm(props) {
  const { addPost, editPost, dispatch, state, singlePost } =
    useContext(ContentContext);
  const [inputs, setInputs] = useState(initInputs);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.edit === true) {
      const thisPost = state.currentPost
      setInputs({
        title: thisPost.title,
        description: thisPost.description,
        imgUrl: thisPost.imgUrl,
        tag: thisPost.tag,
      });
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state.edit === false) {
      addPost(inputs);
    } else {
      editPost( state.currentPost._id, inputs);
      dispatch({ type: "edit" });
    }
    setInputs(initInputs);
    navigate(-1);
  }

  const { title, description, imgUrl, tag } = inputs;
  return (
    <div>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Title"
        />
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
          placeholder="Image Url"
        />
        <select id="tag" value={inputs.tag} onChange={handleChange} name="tag">
          <option value="happy-plant">Happy Plant</option>
          <option value="seeking-advice">Seeking Advice</option>
          <option value="new-growth">New Growth</option>
          <option value="identification">Identification</option>
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
}
