import React,{Fragment,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import AppNavbar from './components/AppNavbar';
//import AppFooter from './components/Footer';
import Alert from './components/Alert';
import Landing from './components/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Explore from './components/explore/Explore';
import BooksByGenre from './components/explore/BooksByGenre';
import BookById from './components/explore/BookById';
import MyShelf from './components/user/MyShelf';
import Profile from './components/user/Profile';
import Admin  from './components/user/Admin';
import PrivateRoute from './routing/PrivateRoutes';
import AdminRoute from './routing/AdminRoutes';

//redux
import {Provider} from 'react-redux';
import store from './store'
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <AppNavbar />
          <Route exact path="/" component={Landing} />
       {/*<AppFooter/>*/} 
          <section className ="container">
            <Alert/>
            <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path = "/booksin/:genre" component={BooksByGenre}/>
            <Route exact path = "/book/:id" component={BookById}/>
            <AdminRoute exact path = "/admin" component={Admin}/>
            <PrivateRoute exact path ="/myshelf" component ={MyShelf}/>
            <PrivateRoute exact path ="/profile" component ={Profile}/>
            </Switch> 
          </section> 
        </Fragment>
      </Router>
    </Provider>
  );
} 

export default App;
