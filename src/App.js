import './App.css';
import "bootswatch/dist/flatly/bootstrap.min.css";
import React, { useEffect } from 'react';
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

let existToken;

function App() {

  useEffect(() => {
    async function initInterceptor() {
      if (!getToken()) {
        return console.log("no token");
      }
    }

    initInterceptor();

    if (!getToken()) {
      existToken = false;
    } else {
      existToken = true;
    }
  }, []);

  return (
    <Router>

      <NavMenu />

      <div className="contaier p-4">

        <Route path="/" exact component={GoalsList} />
        <Route path="/edit/:id" component={CreateGoal} />
        <Route path="/create" component={CreateGoal} />
        <Route path="/expenses" exact component={ShowExpenses} />
        <Route path="/expenses/edit/:id" component={InputExpenses} />
        <Route path="/expenses/create" component={InputExpenses} />
        <Route path="/calculator" component={Calculator} />
        <Route path="/log" component={Login} />
        <Route path="/reg" component={Register} />
        
      </div>

    </Router>
  );
}

export default App;
