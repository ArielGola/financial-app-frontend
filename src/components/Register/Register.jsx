// Modules
import React, { useState } from "react";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";

// Styles
import "./Register.css";

function Register(props) {

  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");

  const [errorGet, setErrorGet] = useState(false);


  const handleLoggedRegister = (value) => {
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
    if (e.target.name === "age") {
      setAge(e.target.value);
    }
    if (e.target.name === "country") {
      setCountry(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };


  const onSubmitForm = async (e) => {
    try {
      
      e.preventDefault();

      const newUser = {
        name: name,
        email: email,
        age: age,
        country: country,
        password: password,
      };

      const response = await Axios.post("http://localhost:4000/api/users/usr/", newUser)
      localStorage.setItem('token', response.data.token);

      handleLoggedRegister(true);

      history.push("/");

    } catch (error) {
      setErrorGet(true);
    }
  };


  if (errorGet) {
    return (

      <div className="col-md-8 offset-md-2 margin-top">
        <div className="card">
          <div className="card-header">
            <h2>There´s was a error with user sign up</h2>
          </div>
          <div className="card-body">
            <p className="h5 m-2">
              Try it again
            </p>
            <p className="lead m-2">
              <Link to="/home" className="text-primary">
                <b>Click here for go to home page</b>
              </Link>
              or
              <Link to="/log" className="text-primary">
                <b> click here for sign in your account.</b>
              </Link>
            </p>
          </div>
        </div>
      </div>

    );
  } else {
    return (

      <div className="col-md-6 offset-md-3 margin-top">
        <div className="card-header bg-light">
          <h3>Create an account</h3>
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
                type="number"
                className="form-control"
                placeholder="Age..."
                name="age"
                onChange={onChangeInput}
                required
              />
            </div>
            <hr className="my-2" />
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Country..."
                name="country"
                onChange={onChangeInput}
                required
              />
            </div>
            <hr className="my-2" />
            <div className="form-group">
              <input
                type="text"
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
          <p className="mt-2">Do you already have an account? <Link to="/log">click here to login</Link></p>
        </div>
      </div>

    );
  }
}

export default Register;
