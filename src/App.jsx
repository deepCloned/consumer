import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './pages/login/Login.jsx';
import Main from './pages/main/Main.jsx';


function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/main" component={Main}></Route>
          <Redirect from="/" to="/login"></Redirect>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
