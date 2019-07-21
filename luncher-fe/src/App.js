import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { checkLogin } from './actions';

import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);
  return (
    <main>
      <Router>
        <NavBar />
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </div>
      </Router>
    </main>
  );
}

export default App;
