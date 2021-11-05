import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function CreateGoal(props) {
  useEffect(() => {
    getData();
  }, []);

  let history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [deadline, setDeadline] = useState(Date.now());
  const [currentDate, setCurrentDate] = useState(Date.now());
  const [isEdit, setIsEdit] = useState(false);
  const [idEditing, setIdEditing] = useState("");

  async function getData() {
    if (props.match.params.id) {
      const response = await Axios.get(
        "http://localhost:4000/api/financial/goals/" + props.match.params.id
      );
      const data = response.data;

      setTitle(data.title);
      setDescription(data.description);
      setCost(data.cost);
      setDeadline(new Date(data.deadline));
      setCurrentDate(new Date(data.currentDate));
      setIsEdit(true);
      setIdEditing(props.match.params.id);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const newGoal = {
      title: title,
      description: description,
      cost: cost,
      deadline: deadline,
      currentDate: currentDate,
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

    //window.location.href = "/";
    history.push("/");
  };

  const onChangeInput = (e) => {
    if (e.target.name === "title") setTitle(e.target.value);
    if (e.target.name === "description") setDescription(e.target.value);
    if (e.target.name === "cost") setCost(e.target.value);
    if (e.target.name === "deadline") setDeadline(e.target.value);
    if (e.target.name === "currentDate") setCurrentDate(e.target.value);
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card-body bg-light">
        <h3>{isEdit ? "Edit Goal" : "Create Goal"}</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            {/* Hay Que intentar usar un plugin de calendario */}
            <input
              type="date"
              className="form-control"
              name="currentDate"
              required
              value={currentDate}
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group">
            {/* Hay Que intentar usar un plugin de calendario */}
            <input
              type="date"
              className="form-control"
              name="deadline"
              required
              value={deadline}
              onChange={onChangeInput}
            />
          </div>
          <button className="btn btn-primary">
            {isEdit ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateGoal;
