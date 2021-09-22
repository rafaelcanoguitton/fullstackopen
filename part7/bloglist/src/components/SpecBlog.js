import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Blog=() => {
  const id = useParams().id
  const blogs=useSelector(state => state.blogs)
  const blog=blogs.find(b => b.id===id)
  if(blogs.length!==0){
    return (
      <>
        <h2>{blog.title}</h2>
        <div className='blog'>
          <a href={blog.url}>{blog.url}</a>
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