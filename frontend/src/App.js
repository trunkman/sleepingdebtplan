import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';
import { Home } from './containers/Home'
import { User } from './containers/User'
import { fetchLoggedIn } from './apis/users'

function App() {

  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState({});

  // ログインのコールバック関数
  const handleLogin = (data) => {
    setLoggedInStatus("ログイン済み")
    setUser(data.user)
  }

  // ログアウトのコールバック関数
  const handleLogout = () => {
    setLoggedInStatus("未ログイン")
    setUser({})
  }

  // ログイン状態を追跡するコールバック関数
  const checkLoginStatus = () => {
    fetchLoggedIn()
      .then((data) => {
        if (data.logged_in && loggedInStatus === "未ログイン") {
          handleLogin(data)
        } else if (!data.logged_in && loggedInStatus === "ログイン済み") {
          handleLogout()
        }
      }).catch(error => {
        console.log('ログインエラー', error)
      })
  }

  useEffect(() =>
    checkLoginStatus()
  )

  return (
    <Router>
      <Switch>
        <Route exact
          path="/">
          <Home
            loggedInStatus={loggedInStatus}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
        </Route>
      </Switch>
      <Switch>
        <Route exact
          path="/user/:id"
          render={({ match }) =>
            <User
              match={match}
              loggedInStatus={loggedInStatus}
            />
          }>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
