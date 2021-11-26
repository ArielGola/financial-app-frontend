// Modules
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

// Components
import Loader from "../Loader/Loader";

function ShowExpenses() {

  useEffect(() => {

    async function getExpenses() {
      try {
        
        const response = await Axios.get(
          "http://localhost:4000/api/financial/expenses"
        );

        setLoader(false);
        setExpenses(response.data);
        getBalance(response.data);
        
      } catch (error) {
        setLoader(true);
      }
    };

    getExpenses();

  }, []);


  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loader, setLoader] = useState(true);
  const [errorGet, setErrorGet] = useState(false);


  function getBalance(expenses) {
    try {

      let mortgageRental;

      if (expenses[0].apartment.mortgage) {
        mortgageRental = expenses[0].apartment.mortgage;
      }
      if (expenses[0].apartment.rental) {
        mortgageRental = expenses[0].apartment.rental;
      }
      
      const totalExpenses =
        Number(mortgageRental) +
        Number(expenses[0].childcare) +
        Number(expenses[0].clothing) +
        Number(expenses[0].transport) +
        Number(expenses[0].services) +
        Number(expenses[0].markets) +
        Number(expenses[0].restaurants) +
        Number(expenses[0].leisure) +
        Number(expenses[0].others);

      const totalIncomes = 
        Number(expenses[0].incomes.salary) +
        Number(expenses[0].incomes.otherIncome);

      const balanceCount = totalIncomes - totalExpenses;

      setBalance(balanceCount);

    } catch (error) {
      setErrorGet(true);
    }
  }


  if (loader === true) {
    return (

      <Loader />

    );
  } else if (!expenses || expenses.length <= 0 || errorGet) {
    return (

      <div className="col-md-8 offset-md-2">
        <div className="card">
          <div className="card-header">
            <h2>You haven't entered any expenses yet</h2>
          </div>
          <div className="card-body">
            <p className="h5 m-2">
              For create a balance you must be logged or create a count.
            </p>
            <Link className="btn btn-success btn-block" to="/log">
              Click here to login your count.
            </Link>
          </div>
        </div>
      </div>

    );
  } else {
    return (

      <div className="col-md-8 offset-md-2">
        {expenses.map((exp) => (
          <div className="card-body bg-light" key={exp._id}>
            <div className="card-header">
              <h3 className="card-title">Balance of Expenses per month</h3>
            </div>
            <div className="card-body">
              <div className="jumbotron-fluid">
                <p className="lead">Salary: ${exp.incomes.salary}</p>
                <p className="lead">
                  Others Incomes: ${exp.incomes.otherIncome}
                </p>
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
                <p className="lead">Others expenses (Credit card): ${exp.others}</p>
                <hr className="my-4" />
                <p className="lead"><i>Balance: ${balance}</i></p>
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
        ))}
      </div>

    );
  }
}

export default ShowExpenses;
