import {Router,Route,Switch} from 'react-router-dom';
import React from 'react';
import Signup from './../ui/components/Signup';
import Link from './../ui/components/Link';
import NotFound from './../ui/components/NotFound';
import Login from './../ui/components/Login';
import createBrowserHistory from 'history/createBrowserHistory';

export const History=createBrowserHistory();

const unAuthenticatedPages=['/','/signup'];  //pages person cannot visit if he is authenticated
const AuthenticatedPages=['/links'];    //pages person can visit if he is authenticated

export const onAuthChange=(isAuthenticated)=>{
  const pathname=History.location.pathname;
  const isunAuthenticatedPage=unAuthenticatedPages.includes(pathname);
  const isAuthenticatedPage=AuthenticatedPages.includes(pathname);
  if (isAuthenticated && isunAuthenticatedPage) {
    History.replace('/links');
  }
  else if (!isAuthenticated && isAuthenticatedPage ) {
    History.replace('/');
  }
};
export const routes=(
  <Router history={History}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/links" component={Link}/>
      <Route path="*" component={NotFound}/>
    </Switch>
  </Router>
);
