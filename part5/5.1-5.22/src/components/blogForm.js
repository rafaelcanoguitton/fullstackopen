import React, { useState } from 'react'
import blogService from '../services/blogs'
const BlogForm=({ user,blogs,setBlogs,setStyle,setMessage }) => {
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')
  const handleCreate=async(event) => {
    event.preventDefault()
    try{
      const blogToPost={
        title:title,
        author:author,
        url:url
      }
      console.log(user.token)
      const newBlog= await blogService.postBlog(blogToPost,user.token)
      newBlog.user=user
      setBlogs(blogs.concat(newBlog))
      setStyle('success')
      setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {  setMessage('') }, 4000)
    } catch (exception){
      setStyle('error')
      setMessage('The blog couldn\'t be added')
      setTimeout(() => {  setMessage('') }, 4000)
    }
  }
  return <div>
    <form onSubmit={handleCreate}>
      <div>
        title:{' '}
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author{' '}
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url{' '}
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
}
export default BlogForm