import React,{Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/Navbar';
import AppFooter from './components/Footer';
import Landing from './components/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
function App() {
  return (
    <Router>
        <Fragment>
          <AppNavbar />
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
          <AppFooter/>
          <section className ="container">
            <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
  );
} 

export default App;
