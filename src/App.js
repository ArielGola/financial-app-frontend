import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavMenu from './components/NavMenu/NavMenu';

function App() {
  return (
    <Router>

      <NavMenu />

    </Router>
  );
}

export default App;
