import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function ShowExpenses() {
  useEffect(() => {
    async function getExpenses() {
      const response = await Axios.get(
        "http://localhost:4000/api/financial/expenses"
      );
      setExpenses(response.data);
    }

    getExpenses();
  }, []);

  const [expenses, setExpenses] = useState([]);

  if (!expenses || expenses.length <= 0) {
    return (
      <div className="col-md-8 offset-md-2">
        <div className="card-body bg-light">
          <h3 className="card-title">You haven't entered any expenses yet</h3>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-md-8 offset-md-2">
        {
        expenses.map((exp) => (
          <div className="card-body bg-light" key={exp._id}>
            <div className="card-header">
              <h3 className="card-title">Balance of Expenses per month</h3>
            </div>
            <div className="card-body">
              <div className="jumbotron-fluid">
                <p className="lead">Salary: ${exp.incomes.salary}</p>
                <p className="lead">Others Incomes: ${exp.incomes.otherIncome}</p>
                <hr className="my-4" />
                <p className="lead">Mortgage: ${exp.apartment.mortgage}</p>
                <p className="lead">Rental: ${exp.apartment.rental}</p>
                <hr className="my-4" />
                <p className="lead">Childcare: ${exp.childcare}</p>
                <hr className="my-4" />
                <p className="lead">Clothing: ${exp.clothing}</p>
                <hr className="my-4" />
                <p className="lead">Transport: ${exp.transport}</p>
                <hr className="my-4" />
                <p className="lead">Services: ${exp.services}</p>
                <hr className="my-4" />
                <p className="lead">Markets: ${exp.markets}</p>
                <hr className="my-4" />
                <p className="lead">Restaurants: ${exp.restaurants}</p>
                <hr className="my-4" />
                <p className="lead">Leisure: ${exp.leisure}</p>
                <hr className="my-4" />
                <p className="lead">Others expenses: ${exp.others}</p>
                <hr className="my-4" />
              </div>
            </div>
            <div className="card-footer d-flex align-content-between">
              <Link
                className="btn btn-success btn-block"
                to={"/expenses/edit/" + exp._id}
              >
                Edit
              </Link>
            </div>
            <div className="card-footer">
              <p>- You can have one balance of expenses.</p>
              <p>- All products must be calculated in american dollars.</p>
            </div>
          </div>
        ))
        }
      </div>
    );
  }
}

export default ShowExpenses;
