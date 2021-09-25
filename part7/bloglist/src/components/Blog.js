import React, { useState } from 'react'
import { delBlog, upBlog } from '../reducers/BlogReducer'
import blogService from '../services/blogs'
import { useSelector,useDispatch } from 'react-redux'
import { setNotification } from '../reducers/NotificationReducer'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
const Blog = ({ blog,showButton }) => {
  const [showInfo, setShow] = useState(false)
  const user= useSelector(state => state.user)
  const dispatch=useDispatch()
  const deleteHandler = async () => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog.id, user.token)
        dispatch(delBlog(blog))
        dispatch(setNotification(`Blog ${blog.title} has been deleted`))
        setTimeout(() => {
          dispatch(setNotification(''))
        }, 4000)
      } catch (e) {
        console.log(e)
        dispatch(setNotification('There was an error deleting the blog'))
        setTimeout(() => {
          dispatch(setNotification(''))
        }, 4000)
      }
    }
  }

  if (showInfo) {
    return (
      <div className='blog'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <Button variant="contained" color="primary"
          onClick={() => {
            setShow(!showInfo)
          }}
        >
          hide
        </Button>
        <br />
        {blog.url}
        <br />
        {blog.likes}{' '}
        <Button variant="contained" color="primary"
          onClick={() => {
            const upLikes=blog
            upLikes.likes=blog.likes+1
            dispatch(upBlog(upLikes,user.token))
          }}
        >
          like
        </Button>
        <br />
        {blog.author}
        <br />
        {showButton ? (
          <Button variant="contained" color="primary"
            onClick={deleteHandler}>remove</Button>
        ) : (
          <></>
        )}
      </div>
    )
  } else {
    return (
      <div className='blog'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}{' '}
        <Button variant="contained" color="primary"
          onClick={() => {
            setShow(!showInfo)
          }}
        >
          view
        </Button>
      </div>
    )
  }
}
export default Blog
