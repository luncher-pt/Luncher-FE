import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { checkLogin } from './actions';

import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';

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
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          {/* single school route ( /updateSchool ) to be implemented */}
        </div>
      </Router>
    </main>
  );
}

export default App;
