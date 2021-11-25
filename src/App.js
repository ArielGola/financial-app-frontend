import './App.css';
import "bootswatch/dist/flatly/bootstrap.min.css";
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { getToken, initInterceptor } from './helpers/authHelpers.js';

import NavMenu from './components/NavMenu/NavMenu';
import GoalsList from './components/GoalsList/GoalsList';
import CreateGoal from './components/CreateGoal/CreateGoal';
import ShowExpenses from './components/ShowExpenses/ShowExpenses';
import Calculator from './components/Calculator/Calculator';
import InputExpenses from './components/InputExpenses/InputExpenses';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

initInterceptor();

function App() {

  useEffect(() => {
    setLogged(true);

    async function initInterceptor() {
      if (!getToken()) {
        setLogged(false);
      }
    };

    initInterceptor();
  }, []);

  const [logged, setLogged] = useState(false);

  const handleLogged = (value) => {
    setLogged(value);
  };

  return (
    <Router>

      <NavMenu logged={logged} handleLogged={handleLogged} />

      <div className="contaier p-4">
        
        <Route path="/" exact >
          <GoalsList logged={logged} handleLogged={handleLogged} />
        </Route>
        <Route path="/edit/:id" render={(props) => <CreateGoal {...props} />}/>
        <Route path="/create" exact>
          <CreateGoal />
        </Route>
        <Route path="/expenses" exact>
          <ShowExpenses />
        </Route>
        <Route path="/expenses/edit/:id">
          <InputExpenses />
        </Route>
        <Route path="/expenses/create" exact>
          <InputExpenses />
        </Route>
        <Route path="/calculator" exact>
          <Calculator />
        </Route>
        <Route path="/log" exact>
          <Login handleLogged={handleLogged} />
        </Route>
        <Route path="/reg" exact>
          <Register handleLogged={handleLogged} />
        </Route>
        
      </div>

    </Router>
  );
}

export default App;
