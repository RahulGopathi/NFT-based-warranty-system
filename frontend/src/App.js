import React from 'react';
import Navbar from './components/Navbar';
import Home from './views/customer/Home';
import Install from './views/customer/Install';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  if (window.ethereum) {
    return (
      <>
        <Router>
          <Home />
        </Router>
      </>
    );
  } else {
    return (
      <>
        <Router>
          <Navbar />
          <Install />
        </Router>
      </>
    );
  }
}

export default App;
