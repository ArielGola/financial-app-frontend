import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Register() {
  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");

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
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      age: age,
      country: country,
      password: password,
    };

    const response = await Axios.post("http://localhost:4000/api/users/usr/", newUser)/*.then(
      (res) => {
        localStorage.setItem("token", res.data.token);
      },
      (err) => console.log("El then en el register fallo")
    );*/
    localStorage.setItem('token', response.data.token);

    //window.location.href = "/";
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
      </div>
    </div>
  );
}

export default Register;
