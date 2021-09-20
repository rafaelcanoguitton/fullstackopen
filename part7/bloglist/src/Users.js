import React,{ useState,useEffect } from 'react'
import userService from './services/users'
const Users=() => {
  const [users,setUsers]=useState([])
  useEffect(async () => {
    const UsersFromSv= await userService.getAll()
    setUsers(UsersFromSv)
  },[])
  console.log('osers',users)
  return (
    <>
      <h2>
            Users
      </h2>
      <table>
        <tr>
          <th></th>
          <th><b>blogs created</b></th>
        </tr>
        {
          users.map((u) => {
            return (
              <tr key={u.username}>
                <th>{u.username}</th>
                <th>{u.blogs.length}</th>
              </tr>
            )
          })
        }
      </table>
    </>
  )
}
export default Users