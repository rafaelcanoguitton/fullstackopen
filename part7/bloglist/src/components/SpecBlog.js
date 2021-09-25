import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CommentForm from './CommentForm'
const Blog=() => {
  const id = useParams().id
  const blogs=useSelector(state => state.blogs)
  const blog=blogs.find(b => b.id===id)
  console.log(blog)
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
          <h3>Comments</h3>
          {blog.comments?<ul>{blog.comments.map((c) => {
            return <li key="xd">{ c }</li>
          })}</ul>:<></>}
        </div>
        <CommentForm id={ blog.id }/>
      </>
    )
  } else {
    return <></>
  }
}

export default Blog