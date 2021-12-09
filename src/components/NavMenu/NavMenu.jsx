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

    } else {

      navbarCollapse.className = "hidden-coll";

    }
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark back-dark">
      <div className="container flexin">
        <div className="align-on-right">
          <Link className="navbar-brand back-icon-navbar" to="/home"></Link>
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
              <Link className="link margin-l" to="/home">
                Home
              </Link>
              <Link className="link margin-l" to="/goals">
                Goals
              </Link>
              <Link className="link margin-l" to="/create">
                Create a Goal
              </Link>
              <Link className="link margin-l" to="/expenses">
                My Expenses
              </Link>
              <Link className="link margin-l" to="/calculator">
                Calculate
              </Link>
            </div>
          </div>

          <div>
            {
              !props.logged ? (
                <div className="align">
                  <Link className="link margin-l" to="/log">
                    Login
                  </Link>
                  <Link className="link margin-l" to="/reg">
                    Register
                  </Link>
                </div>
              ) : (
                <div className="navbar-nav">
                  <Link className="link" onClick={deleteSession} to="#">
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
