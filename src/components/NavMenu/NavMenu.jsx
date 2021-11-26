// Modules
import React from "react";
import { Link, useHistory } from "react-router-dom";

// Helpers
import { deleteToken } from '../../helpers/authHelpers';


function NavMenu(props) {

  let history = useHistory();

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

      history.push("/create");
      
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/#">
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
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/#">
              Home
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

        <div className="float-right">
          {
            !props.logged ? (
              <div className="navbar-nav float-right">
                <Link className="nav-link" to="/log">
                  Login
                </Link>
                <Link className="nav-link" to="/reg">
                  Register
                </Link>
              </div>
            ) : (
              <div className="navbar-nav float-right">
                <a className="nav-link" onClick={deleteSession}>
                  Logout
                </a>
              </div>
            )
          }
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
