import React,{Fragment,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppNavbar from './components/Navbar';
import AppFooter from './components/Footer';
import Alert from './components/Alert';
import Landing from './components/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

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
          <AppFooter/>
          <section className ="container">
            <Alert/>
            <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            </Switch> 
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
} 

export default App;