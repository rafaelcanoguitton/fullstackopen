import React, { useState,useEffect } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog, user, deleteBlog,showButton }) => {
  const [showInfo, setShow] = useState(false);
  const deleteHandler = async () => {
    console.log(blog);
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog.id, user.token);
        deleteBlog(blog);
      } catch (e) {}
    }
  };
  if (showInfo) {
    return (
      <div className="blog">
        {blog.title}
        <button
          onClick={() => {
            setShow(!showInfo);
          }}
        >
          hide
        </button>
        <br />
        {blog.url}
        <br />
        {blog.likes}{" "}
        <button
          onClick={() => {
            console.log(blog);
          }}
        >
          like
        </button>
        <br />
        {blog.author}
        <br />
        {showButton ? (
          <button onClick={deleteHandler}>remove</button>
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    return (
      <div className="blog">
        {blog.title} {blog.author}{" "}
        <button
          onClick={() => {
            setShow(!showInfo);
          }}
        >
          view
        </button>
      </div>
    );
  }
};

export default Blog;
