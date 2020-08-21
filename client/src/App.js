import React, {useState, useEffect} from 'react';
import './App.css';

import HomePage from './components/HomePage'
import SignInPage from './components/SignInPage'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory
} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'

function App() {
  let history = useHistory()
  const [jwtToken, setjwtToken] = useState(false)
  const [server_check, set_server_check] = useState("no check done")

  return(
    <div className="App">
      <p>Server Check - {server_check}</p>
      <Router>
        <Switch>
          <Route exact path="/">
            <SignInPage/>
          </Route>
          <Route path="/homepage">
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;