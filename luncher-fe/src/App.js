import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';

function App() {
  return (
    <main>
      <Router>
        <NavBar />
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          {/* single school route ( /updateSchool ) to be implemented */}
        </div>
      </Router>
    </main>
  );
}

export default App;
