import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
const Blog=() => {
  const [blog,setBlog]=useState(null)
  const id = useParams().id
  useEffect(async () => {
    const blogsFromSv=await blogService.getAll()
    const ourBlog=blogsFromSv.find(b => b.id===id)
    setBlog(ourBlog)
  }, [])
  if(blog){
    return (
      <>
        <h2>{blog.title}</h2>
        <div className='blog'>

          {blog.url}
          <br />
          {blog.likes}{' '}
          <br />
          {blog.author}
          <br />
        </div></>
    )
  } else {
    return <></>
  }
}

export default Blog