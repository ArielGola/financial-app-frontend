import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    e.preventDefault();

    const logUser = {
      name: name,
      email: email,
      password: password,
    };

    const response = await Axios.post("http://localhost:4000/api/users/usr/log", logUser);
    localStorage.setItem("token", response.data.token);

    history.push("/");
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card-header bg-light">
        <h3>Create a count</h3>
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
      </div>
    </div>
  );
}

export default Login;
