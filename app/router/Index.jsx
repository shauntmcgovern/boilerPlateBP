import React from 'react';
import {Route, Router, indexRoute, hashHistory} from 'react-router';

import toDoApp from 'toDoApp';
import Login from 'Login';
import fireBase from 'app/fireBase/';

var requireLogin = (nextState, replace, next) => {
  if (!fireBase.auth().currentUser) {
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (fireBase.auth().currentUser) {
    replace('/toDos');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="toDos" component={toDoApp} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
    </Route>
  </Router>
);
