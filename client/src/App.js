import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/navbar';
import AppFooter from './components/footer';
function App() {
  return (
    <div className="App">
      <AppNavbar />
      <AppFooter />
    </div>
  );
}

export default App;
