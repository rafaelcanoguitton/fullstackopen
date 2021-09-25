import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeComment } from '../reducers/BlogReducer'
import { TextField, Button } from '@material-ui/core'
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
      <TextField type="text" label="Comment" variant="outlined"
        value={comment}
        name="Comment"
        onChange={({ target }) => setComment(target.value)}/>
      <Button variant="contained" color="primary" type="submit">Submit Comment</Button>
    </form>
  </>
}
export default CommentForm