import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';

function App() {
  return (
    <main>
      <Router>
        <NavBar />
        <div>
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    </main>
  );
}

export default App;
