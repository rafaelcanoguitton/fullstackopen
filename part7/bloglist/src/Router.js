import React from 'react'
import Main from './Main'
import Users from './Users'
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import Blog from './components/SpecBlog'
import NavBar from './components/NavBar'
import Container from '@material-ui/core/Container'
const AppRouter=() => {
  return(
    <Container>
      <Router>
        <NavBar/>
        <Switch>
          <Route path='/users/:id'>
            <Users/>
          </Route>
          <Route path='/users'>
            <Users/>
          </Route>
          <Route path='/blogs/:id'>
            <Blog/>
          </Route>
          <Route path='/'>
            <Main/>
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}
export default AppRouter