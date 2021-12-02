// Modules
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Helpers
import { deleteToken } from '../../helpers/authHelpers';

// Styles
import "./NavMenu.css";


function NavMenu(props) {

  let history = useHistory();

  const [counter, setCounter] = useState(1);

  // Handle state of App.js
  const handleLoggedNavMenu = (value) => {
    const changeLogged = props.handleLogged;
    changeLogged(value);
  };

  // Logout
  const deleteSession = () => {
    try {
      
      deleteToken();

      handleLoggedNavMenu(false);

      history.push("/home");
      
    } catch (error) {
      console.log(error.message);
    }
  };


  function collapseHidden(e) {
    let add = counter + 1;
    setCounter(add);

    let division = counter / 2;

    let navbarCollapse = document.getElementById('navbarNavAltMarkup');

    if (String(division).includes(".")) {

      navbarCollapse.className = "navbar-collapse collapse show";
      console.log(navbarCollapse);

    } else {

      navbarCollapse.className = "hidden-coll";
      console.log(navbarCollapse);

    }
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="align-on-right" id="ContainerFlex">
          <Link className="navbar-brand" to="/home">
            FINANCIAL
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" onClick={(e) => collapseHidden(e)}></span>
          </button>  
        </div>
        
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/home">
                Home
              </Link>
              <Link className="nav-link" to="/goals">
                Goals
              </Link>
              <Link className="nav-link" to="/create">
                Creata A Goal
              </Link>
              <Link className="nav-link" to="/expenses">
                My Expenses
              </Link>
              <Link className="nav-link" to="/calculator">
                Calculate
              </Link>
            </div>
          </div>

          <div>
            {
              !props.logged ? (
                <div className="navbar-nav align">
                  <Link className="nav-link" to="/log">
                    Login
                  </Link>
                  <Link className="nav-link" to="/reg">
                    Register
                  </Link>
                </div>
              ) : (
                <div className="navbar-nav">
                  <Link className="nav-link" onClick={deleteSession} to="#">
                    Logout
                  </Link>
                </div>
              )
            }
          </div>
      </div>
    </nav>
  );
}

export default NavMenu;
