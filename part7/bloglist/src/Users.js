import React,{ useState,useEffect } from 'react'
import userService from './services/users'
import { useParams, Link } from 'react-router-dom'
const Users=() => {
  const [users,setUsers]=useState([])
  const id = useParams().id
  useEffect(async () => {
    const UsersFromSv= await userService.getAll()
    setUsers(UsersFromSv)
  },[])
  if(id){
    if(users.length!==0){
      const user=users.find(u =>
        id===String(u.id)
      )
      return (<>
        <h1>{user.username}</h1>
        <h2>
          <b>added blogs</b>
          <ul>
            {user.blogs.map(b => {
              return (<li key={b.id}>{b.title}</li>)
            })}
          </ul>
        </h2>
      </>)
    } else{
      return <></>
    }
  }else{
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
                  <Link to={`/users/${u.id}`}><th>{u.username}</th></Link>
                  <th>{u.blogs.length}</th>
                </tr>
              )
            })
          }
        </table>
      </>
    )
  }
}
export default Users