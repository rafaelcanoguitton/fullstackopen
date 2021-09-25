import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeComment } from '../reducers/BlogReducer'

const CommentForm =({ id }) => {
  const dispatch=useDispatch()
  const [comment,setComment]=useState('')
  const user = useSelector(state => state.user)
  const leaveComment=(event) => {
    event.preventDefault()
    dispatch(makeComment(comment,id,user.token))
  }
  return <>
    <h3>Leave comment</h3>
    <form onSubmit={leaveComment}>
      <input type="text"
        value={comment}
        name="Comment"
        onChange={({ target }) => setComment(target.value)}/>
      <button type="submit">Submit Comment</button>
    </form>
  </>
}
export default CommentForm