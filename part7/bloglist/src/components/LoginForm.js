import React from 'react'
import { useDispatch } from 'react-redux'
import { setU } from '../reducers/UserReducer'
import { setNotification } from '../reducers/NotificationReducer'
import loginService from '../services/login'
const LoginForm=({ username,setUsername,password,setPassword }) => {
  const dispatch=useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user=await loginService.login({ username,password })
      setUsername('')
      setPassword('')
      window.localStorage.setItem('blogToken', JSON.stringify(user))
      dispatch(setU(user))
      dispatch(setNotification('Logged in successfully'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 4000)
    } catch (e) {
      dispatch(setNotification('Wrong username or password'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 3000)
    }
  }
  return <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username{' '}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{' '}
        <input
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
}
export default LoginForm