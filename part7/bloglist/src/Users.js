import React,{ useState,useEffect } from 'react'
import userService from './services/users'
import { useParams, Link } from 'react-router-dom'
import { Table,
  TableRow,
  TableHead
} from '@material-ui/core'
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
        <Table>
          <TableRow>
            <TableHead></TableHead>
            <TableHead><b>blogs created</b></TableHead>
          </TableRow>
          {
            users.map((u) => {
              return (
                <TableRow key={u.username}>
                  <Link to={`/users/${u.id}`}><TableHead>{u.username}</TableHead></Link>
                  <TableHead>{u.blogs.length}</TableHead>
                </TableRow>
              )
            })
          }
        </Table>
      </>
    )
  }
}
export default Users