import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [showInfo,setShow]=useState(false);
  if(showInfo){
    return <div className="blog">
      {blog.title}<button onClick={()=>{setShow(!showInfo)}}>hide</button><br/>
      {blog.url}<br/>
      {blog.likes} <button onClick={()=>{console.log(blog)}}>like</button><br/>
      {blog.author}<br/>
    </div>
  }else{
    return <div className="blog">
    {blog.title} {blog.author} <button onClick={()=>{setShow(!showInfo)}}>view</button>
  </div>;
  }
};

export default Blog;
