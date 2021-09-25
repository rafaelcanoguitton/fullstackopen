import React, { useState } from 'react'
import { createBlog } from '../reducers/BlogReducer'
import { useDispatch,useSelector } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
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
      <div className="input">
        <TextField
          label="Title" variant="outlined"
          type="text"
          value={title}
          id="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="input">
        <TextField
          label="Author" variant="outlined"
          type="text"
          value={author}
          id="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div className="input">
        <TextField
          label="URL" variant="outlined"
          type="text"
          value={url}
          id="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button variant="contained" color="primary" type="submit">create</Button>
    </form>
  </div>
}
export default BlogForm