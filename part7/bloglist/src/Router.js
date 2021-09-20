import React from 'react'
import Main from './Main'
import Users from './Users'
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
const AppRouter=() => {
  return(
    <Router>
      <Switch>
        <Route path='/users/:id'>
          <Users/>
        </Route>
        <Route path='/users'>
          <Users/>
        </Route>
        <Route path='/'>
          <Main/>
        </Route>
      </Switch>
    </Router>
  )
}
export default AppRouter