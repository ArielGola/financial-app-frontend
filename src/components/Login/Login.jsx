import React, { useState } from "react";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";

function Login(props) {

  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorGet, setErrorGet] = useState(false);


  const handleLoggedLogin = (value) => {
    const changeLogged = props.handleLogged;
    changeLogged(value);
  };


  const onChangeInput = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };


  const onSubmitForm = async (e) => {
    try {
      
      e.preventDefault();

      const logUser = {
        name: name,
        email: email,
        password: password,
      };

      try {

        let now = new Date();
        let time = now.getTime();
        let expireTime = time + 60*60*12;
        now.setTime(expireTime);

        const response = await Axios.post("http://localhost:4000/api/users/usr/log", logUser);
        document.cookie = `token=${response.data.token}; expires=${now.toUTCString}`;
        
        handleLoggedLogin(true);
        
      } catch (error) {
        setErrorGet(true);
      } finally {
        history.push("/");
      }

    } catch (error) {
      setErrorGet(true);
    }
  };


  if (errorGet) {
    return (

      <div className="col-md-8 offset-md-2">
        <div className="card-body bg-light">
          <h3 className="card-title">There was an error with the user sing in</h3>
          <Link className="btn btn-success btn-block" to="expenses/create">
            Click here to go to home page
          </Link>
        </div>
      </div>

    );
  } else {
    return (
  
      <div className="col-md-6 offset-md-3">
        <div className="card-header bg-light">
          <h3>Login your account</h3>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={onSubmitForm}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name..."
                name="name"
                onChange={onChangeInput}
                required
              />
            </div>
            <hr className="my-2" />
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email..."
                name="email"
                onChange={onChangeInput}
                required
              />
            </div>
            <hr className="my-2" />
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password..."
                name="password"
                onChange={onChangeInput}
                required
              />
            </div>
            <hr className="my-2" />
            <button className="btn btn-primary btn-block">Done</button>
          </form>
          <p className="mt-2">You don´t have any account yet? <Link to="/reg">click here to register</Link></p>
        </div>
      </div>
      
    );
  }
}

export default Login;
