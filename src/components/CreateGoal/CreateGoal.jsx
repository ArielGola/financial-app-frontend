// Modules
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";
import DatePickerR from 'react-datepicker';

// Components
import Loader from "../Loader/Loader";

// Styles
import "react-datepicker/dist/react-datepicker.css";


function CreateGoal(props) {
  
  useEffect(() => {

    async function getData() {
      try {
        
        // Manage => Edit on || Edit off
        if (window.location.pathname.includes('edit')) {
          let id = props.match.params.id;

          const response = await Axios.get(
            "http://localhost:4000/api/financial/goals/" + id
          );
          const data = response.data;
    
          setTitle(data.title);
          setDescription(data.description);
          setCost(data.cost);
          setDeadline(new Date(data.deadline));
          setCurrentDate(new Date(data.currentDate));
          setIsEdit(true);
          setIdEditing(id);
        } else {
          setIsEdit(false);
        }

        setLoader(false);

      } catch (error) {
        setErrorGet(true);
      };
    };

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [deadline, setDeadline] = useState(Date.now());
  const [currentDate, setCurrentDate] = useState(Date.now());
  const [isEdit, setIsEdit] = useState(false);
  const [idEditing, setIdEditing] = useState("");

  const [errorGet, setErrorGet] = useState(false);
  const [loader, setLoader] = useState(true);


  const onSubmit = async (e) => {
    try {
      
      e.preventDefault();

      const newGoal = {
        title: title,
        description: description,
        cost: cost,
        deadline: deadline,
        currentDate: currentDate
      };

      if (isEdit) {
        // Update
        await Axios.put(
          "http://localhost:4000/api/financial/goals/" + idEditing,
          newGoal
        );
      } else {
        // Create
        await Axios.post("http://localhost:4000/api/financial/goals", newGoal);
      }

      history.push("/");
      
    } catch (error) {
      setErrorGet(true);
    }
  };


  const onChangeInput = (e) => {
    if (e.target.name === "title") setTitle(e.target.value);
    if (e.target.name === "description") setDescription(e.target.value);
    if (e.target.name === "cost") setCost(e.target.value);
    if (e.target.name === "deadline") setDeadline(e.target.value);
    if (e.target.name === "currentDate") setCurrentDate(e.target.value);
  };


  if (loader === true) {
    return (

      <Loader />

    );
  } else if (errorGet) {
    return (

      <div className="col-md-8 offset-md-2">
        <div className="card-body bg-light">
          <h3 className="card-title">There was an error with creating of goal</h3>
          <Link className="btn btn-success btn-block" to="/">
            Click here to go to home page
          </Link>
        </div>
      </div>

    );
  } else {
    return (

      <div className="col-md-6 offset-md-3">
        <div className="card-body bg-light">
          <h3>{isEdit ? "Edit Goal" : "Create Goal"}</h3>
          <hr className="my-2" />
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="lead">Goal title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Title..."
                required
                value={title}
                onChange={onChangeInput}
              />
            </div>
            <hr className="my-2" />
            <div className="form-group">
              <label className="lead">Goal description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Description..."
                required
                value={description}
                onChange={onChangeInput}
              />
            </div>
            <hr className="my-2" />
            <div className="form-group">
              <label className="lead">Goal cost $</label>
              <input
                type="number"
                className="form-control"
                name="cost"
                placeholder="Cost..."
                required
                value={cost}
                onChange={onChangeInput}
              />
            </div>
            <hr className="my-2" />
            <div className="form-group">
              <label className="lead">Goal initiation date</label>
                <DatePickerR 
                  className="form-control"
                  onChange={(date) => setCurrentDate(date)}
                  selected={currentDate}
                  dateFormat="dd/MM/yyyy"
                  required
                />
            </div>
            <hr className="my-2" />
            <div className="form-group">
              <label className="lead">Goal deadline</label>
                <DatePickerR 
                  className="form-control"
                  onChange={(date) => setDeadline(date)}
                  selected={deadline}
                  dateFormat="dd/MM/yyyy"
                  minDate={Date.now()}
                  required
                />
            </div>
            <hr className="my-2" />
            <button className="btn btn-primary">
              {isEdit ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </div>
    
    );
  }
}

export default CreateGoal;
