import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
    <Router>
      <Routes />
    </Router>
    );
  }
}

export default App;
