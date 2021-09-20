import React, { useState } from 'react'
import { createBlog } from '../reducers/BlogReducer'
import { useDispatch,useSelector } from 'react-redux'
const BlogForm=() => {
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')
  const dispatch = useDispatch()
  const user=useSelector(state => state.user)
  const callTheFunction=(event) => {
    event.preventDefault()
    dispatch(createBlog({
      title:title,
      author:author,
      url:url
    },user.token))
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return <div>
    <form onSubmit={callTheFunction}>
      <div>
        title:{' '}
        <input
          type="text"
          value={title}
          id="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author{' '}
        <input
          type="text"
          value={author}
          id="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url{' '}
        <input
          type="text"
          value={url}
          id="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
}
export default BlogForm