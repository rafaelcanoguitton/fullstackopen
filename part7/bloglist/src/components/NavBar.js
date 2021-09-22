import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setU } from '../reducers/UserReducer'
const NavBar=() => {
  const user=useSelector(state => state.user)
  const dispatch=useDispatch()
  const handleLogout = async () => {
    window.localStorage.removeItem('blogToken')
    dispatch(setU(null))
  }
  return <div className='nav'>
    <Link to='/'>blogs</Link>
    <Link to='/users'>users</Link>
    {user?<div>{user.username} is logged in</div>:<></>}
    <button onClick={handleLogout}>logout</button>
  </div>
}
export default NavBar