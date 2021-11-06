import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";

import Loader from "../Loader/Loader";

function InputExpenses(props) {

  useEffect((props) => {

    async function getData() {
      try {

        if (props.match.params.id) {
          
          const response = await Axios.get(
            "http://localhost:4000/api/financial/expenses"
          );
    
          setSalary(response.data[0].incomes.salary);
          setOtherIncome(response.data[0].incomes.otherIncome);
          setMortgage(response.data[0].apartment.mortgage);
          setRental(response.data[0].apartment.rental);
          setChildcare(response.data[0].childcare);
          setClothing(response.data[0].clothing);
          setTransport(response.data[0].transport);
          setServices(response.data[0].services);
          setMarkets(response.data[0].markets);
          setRestaurants(response.data[0].restaurants);
          setLeisure(response.data[0].leisure);
          setOthers(response.data.others);
          setIsEdit(true);
          setIdEditing(props.match.params.id);
  
        } else {
          setIsEdit(false);
        };

        setLoader(false);

      } catch (error) {
        setErrorGet(true);
      }
    };

    getData();

  }, []);

  let history = useHistory();

  const [salary, setSalary] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [mortgage, setMortgage] = useState(0);
  const [rental, setRental] = useState(0);
  const [childcare, setChildcare] = useState(0);
  const [clothing, setClothing] = useState(0);
  const [transport, setTransport] = useState(0);
  const [services, setServices] = useState(0);
  const [markets, setMarkets] = useState(0);
  const [restaurants, setRestaurants] = useState(0);
  const [leisure, setLeisure] = useState(0);
  const [others, setOthers] = useState(0);
  const [idEditing, setIdEditing] = useState("");
  const [isEdit, setIsEdit] = useState(true);

  const [errorGet, setErrorGet] = useState(false);
  const [loader, setLoader] = useState(true);
  

  const onSubmit = async (e) => {
    try {
      
      e.preventDefault();

      const newExpenses = {
        incomes: {
          salary: salary,
          otherIncome: otherIncome,
        },
        apartment: {
          mortgage: mortgage,
          rental: rental,
        },
        childcare: childcare,
        clothing: clothing,
        transport: transport,
        services: services,
        markets: markets,
        restaurants: restaurants,
        leisure: leisure,
        others: others,
      };

      if (isEdit) {
        await Axios.put(
          "http://localhost:4000/api/financial/expenses/" + idEditing,
          newExpenses
        );
      } else {
        await Axios.post(
          "http://localhost:4000/api/financial/expenses",
          newExpenses
        );
      }

      history.push("/expenses");

    } catch (error) {
      setErrorGet(true);
    }
  };

  const onChangeInput = (e) => {
    if (e.target.name === "salary") setSalary(e.target.value);
    if (e.target.name === "otherIncome") setOtherIncome(e.target.value);
    if (e.target.name === "mortgage") setMortgage(e.target.value);
    if (e.target.name === "rental") setRental(e.target.value);
    if (e.target.name === "childcare") setChildcare(e.target.value);
    if (e.target.name === "clothing") setClothing(e.target.value);
    if (e.target.name === "transport") setTransport(e.target.value);
    if (e.target.name === "services") setServices(e.target.value);
    if (e.target.name === "markets") setMarkets(e.target.value);
    if (e.target.name === "restaurants") setRestaurants(e.target.value);
    if (e.target.name === "leisure") setLeisure(e.target.value);
    if (e.target.name === "others") setOthers(e.target.value);
  };


  if (loader === true) {
    return (

      <Loader />

    );
  } else if (errorGet) {
    return (

      <div className="col-md-8 offset-md-2">
        <div className="card-body bg-light">
          <h3 className="card-title">There was an error with petition of data</h3>
          <Link className="btn btn-success btn-block" to="expenses/create">
            Click here to go to home page
          </Link>
        </div>
      </div>

    );
  } else {
    return (

      <div className="col-md-8 offset-md-2">
        <div className="card-body bg-light">
          <div className="card-header">
            <h3 className="card-title">Balance of Expenses</h3>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="jumbotron-fluid">
                <label className="lead">Salary:</label>
                <input
                  type="number"
                  className="form-control m-2"
                  placeholder="Salary $"
                  name="salary"
                  value={salary}
                  onChange={onChangeInput}
                />

                <label className="lead">Other incomes:</label>
                <input
                  type="number"
                  className="form-control m-2"
                  placeholder="Other Income $"
                  name="otherIncome"
                  value={otherIncome}
                  onChange={onChangeInput}
                />
                <hr className="my-4" />

                <label className="lead">Mortgage:</label>
                <input
                  type="number"
                  className="form-control m-2"
                  placeholder="Mortgage $"
                  name="mortgage"
                  value={mortgage}
                  onChange={onChangeInput}
                />

                <label className="lead">Rental:</label>
                <input
                  type="number"
                  className="form-control m-2"
                  placeholder="Rental $"
                  name="rental"
                  value={rental}
                  onChange={onChangeInput}
                />
                <hr className="my-4" />

                <label className="lead">Childcare:</label>
                <input
                  type="number"
                  className="form-control m-2"
                  placeholder="Childcare $"
                  name="childcare"
                  value={childcare}
                  onChange={onChangeInput}
                />
                <hr className="my-4" />

                <label className="lead">Clothing:</label>
                <input
                  type="number"
                  className="form-control m-2"
                  placeholder="Clothing $"
                  name="clothing"
                  value={clothing}
                  onChange={onChangeInput}
                />
                <hr className="my-4" />

                <label className="lead">Transport:</label>
                <input
                  type="number"
                  className="form-control m-2"
                  placeholder="Transport $"
                  name="transport"
                  value={transport}
                  onChange={onChangeInput}
                />
                <hr className="my-4" />

                <label className="lead">Services:</label>
                <input
                  type="number"
                  className="form-control m-2"
                  placeholder="Services $"
                  name="services"
                  value={services}
                  onChange={onChangeInput}
                />
                <hr className="my-4" />

                <label className="lead">Markets:</label>
                <input
                  type="number"
                  className="form-control m-2"
                  placeholder="Markets $"
                  name="markets"
                  value={markets}
                  onChange={onChangeInput}
                />
                <hr className="my-4" />

                <label className="lead">Restaurants:</label>
                <input
                  type="number"
                  className="form-control m-2"
                  placeholder="Restaurants $"
                  name="restaurants"
                  value={restaurants}
                  onChange={onChangeInput}
                />
                <hr className="my-4" />

                <label className="lead">Leisure:</label>
                <input
                  type="number"
                  className="form-control m-2"
                  placeholder="Leisure $"
                  name="leisure"
                  value={leisure}
                  onChange={onChangeInput}
                />
                <hr className="my-4" />

                <label className="lead">Others expenses:</label>
                <input
                  type="number"
                  className="form-control m-2"
                  placeholder="Others expenses $"
                  name="others"
                  value={others}
                  onChange={onChangeInput}
                />
                <hr className="my-4" />
              </div>
              <button className="btn btn-success">
                {
                  !props.match.params.id ?
                  "Save expenses sheet"
                  :
                  "Edit expenses sheet"
                }
              </button>
            </form>
          </div>
        </div>
      </div>
      
    );
  }
}

export default InputExpenses;
