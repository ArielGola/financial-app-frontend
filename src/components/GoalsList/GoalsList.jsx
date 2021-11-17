import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

import Loader from "../Loader/Loader";

function GoalsList() {

  useEffect(() => {
    getGoals();
  }, []);

  const [goals, setGoals] = useState([]);
  const [loader, setLoader] = useState(true);
  const [errorGet, setErrorGet] = useState(false);

  const getGoals = useCallback(async () => {
    try {
      const response = await Axios.get(
        "http://localhost:4000/api/financial/goals"
      );

      setLoader(false);
      setGoals(response.data);
    } catch (error) {
      setGoals(false);
      setErrorGet(true);
    }
  });

  const deleteGoal = async (id) => {
    try {
      await Axios.delete("http://localhost:4000/api/financial/goals/" + id);
      getGoals();
    } catch (error) {
      setErrorGet(true);
    }
  };

  if (loader === true) {

    return <Loader />;

  } else if (errorGet || !goals || goals.length <= 0) {
    return (

      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h2>Your Goals Space Is Empty</h2>
          </div>
          <div className="card-body">
            <p className="h5 m-4">
              For create and look goals you must be logged or create a count.
            </p>
            <p className="h5 m-4">
              If you be registred you can
              <Link to="/create" className="text-primary">
                <i> create a financial goal here.</i>
              </Link>
            </p>
            <p className="lead m-4">
              <Link to="/log" className="text-primary">
                <b>Click here for login </b>
              </Link>
              or
              <Link to="/reg" className="text-primary">
                <b> click here for create a count.</b>
              </Link>
            </p>
          </div>
        </div>
      </div>

    );
  } else {
    return (

      <div className="row">
        {goals.map((goal) => (
          <div className="col-md-6 p-2" key={goal._id}>
            <div className="card">
              <div className="card-header">
                <h4>{goal.title}</h4>
              </div>
              <div className="card-body">
                <p>{goal.description}</p>
                <p>Cost: ${goal.cost}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <p>
                    {format(goal.currentDate)} // {format(goal.deadline)}
                  </p>
                </div>
                <div>
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => deleteGoal(goal._id)}
                  >
                    X
                  </button>
                  <Link className="btn btn-success" to={"/edit/" + goal._id}>
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    );
  }
}

export default GoalsList;
