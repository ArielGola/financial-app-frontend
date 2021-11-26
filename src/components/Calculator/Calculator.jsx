// Modules
import React, { useState, useEffect } from "react";
import Axios from "axios";

// Helpers
import {
  calculateIncomesF,
  calculateExpensesF,
  calculateGoalsCostsF,
  calculateGoalsCostsPerMonthF,
  calculateCapitalNeededF,
  calculateEstimatedYearsF,
  calculateCostOfLivingPlaceF,
} from "../../helpers/calculatorCompHelpers";

// Components
import Loader from "../Loader/Loader";


function Calculator() {

  useEffect(() => {
		
		async function getData() {
			try {
				
				const expenses = await Axios.get(
					"http://localhost:4000/api/financial/expenses"
				);
		
				const goalsAxios = await Axios.get(
					"http://localhost:4000/api/financial/goals"
				);
		
				setExpenses(expenses.data);
				setGoals(goalsAxios.data);
		
				setgExpenses(
					calculateExpensesF(expenses.data)
				);
				setIncomes(
					calculateIncomesF(expenses.data)
				);
				setgGoalsCost(
					calculateGoalsCostsF(goalsAxios.data)
				);
				setGoalsCostPerMont(
					calculateGoalsCostsPerMonthF(goalsAxios.data)
				);
				setCapitalNeeded(
					calculateCapitalNeededF(goalsCostPerMont, gExpenses, desiredInterest)
				);
				setLoader(false);
				
			} catch (error) {
				setErrorGet(true);
			}
		};

    getData();

  }, []);

	
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);
  const [incomes, setIncomes] = useState(0);
  const [gExpenses, setgExpenses] = useState(0);
  const [gGoalsCost, setgGoalsCost] = useState(0);
  const [goalsCostPerMont, setGoalsCostPerMont] = useState(0);
  const [desiredInterest, setDesiredInterest] = useState(0);
  const [capitalNeeded, setCapitalNeeded] = useState(0);
  const [estimatedYears, setEstimatedYears] = useState(0);
  const [currentCLI, setCurrentCLI] = useState(0);
  const [futureCLI, setFutureCLI] = useState(0);
  const [capitalNeededNewCLI, setCapitalNeededNewCLI] = useState(0);
	const [errorGet, setErrorGet] = useState(false);
	const [loader, setLoader] = useState(true);


  const onChangeInteres = (e) => {
    setDesiredInterest(e.target.value);
  };


  // Form of interes
  const onSubmitFormOne = (e) => {
    e.preventDefault();

		try {

      let calculateCapitalNeeded = calculateCapitalNeededF(
        goalsCostPerMont,
        gExpenses,
        desiredInterest
      );
  
      setCapitalNeeded(calculateCapitalNeeded);
        
      let calculateEstimatedYears = calculateEstimatedYearsF(
        incomes,
        gExpenses,
        capitalNeededNewCLI,
        calculateCapitalNeeded
      );
  
      setEstimatedYears(calculateEstimatedYears);

		} catch (error) {
			setErrorGet(true);
		}
  };


  const onChangeCLI = (e) => {
    if (e.target.name === "currentCLI") setCurrentCLI(e.target.value);
    if (e.target.name === "futureCLI") setFutureCLI(e.target.value);
  };


  // Form of CLI
  const onSubmitFormTwo = (e) => {
    e.preventDefault();

		try {
      
      let calculateCostOfLivingPlace = calculateCostOfLivingPlaceF(currentCLI, futureCLI, capitalNeeded);

			setCapitalNeededNewCLI(calculateCostOfLivingPlace);
      
      let calculateEstimatedYears = calculateEstimatedYearsF(
        incomes,
        gExpenses,
        calculateCostOfLivingPlace,
        capitalNeeded
      );

			setEstimatedYears(calculateEstimatedYears);
			
		} catch (error) {
			setErrorGet(true);
		}
  };


  const clearValues = () => {

    window.scrollTo(0, 0)

    setDesiredInterest(0);
    setCapitalNeeded(0);
    setEstimatedYears(0);
    setCurrentCLI(0);
    setFutureCLI(0);
    setCapitalNeededNewCLI(0);

  };


	if (loader === true) {
		return (
			<Loader />
		);
	} else if (errorGet || !expenses || !goals) {
    return (

      <div className="col-md-8 offset-md-2">
        <div className="card">
          <div className="card-header">
            <h2>You haven't entered any expenses yet for calculate the financial freedom</h2>
          </div>
          <div className="card-body">
            <p className="h5 m-2">
              For create a balance you must be logged or create a count.
            </p>
          </div>
        </div>
      </div>

    );
  } else {
    return (

      <div className="col-md-10 offset-md-1">
        <div className="card-body bg-light">
          {/* SHOW SOME NUMBERS */}
          <div className="card-header">
            <h3 className="card-title">Calculator of Financial Independence</h3>
          </div>
          <div className="card-body">
            <div className="jumbotron-fluid">
              <p className="lead">Total expenses: ${gExpenses}</p>
              <hr className="my-2" />
              <p className="lead">Total incomes: ${incomes}</p>
              <hr className="my-2" />
              <p className="lead">Anual expenses: ${gExpenses * 12}</p>
              <hr className="my-2" />
              <p className="lead">Anual incomes: ${incomes * 12}</p>
              <hr className="my-2" />
              <p className="h5 mb-4">
                Anual balance: ${incomes * 12 - gExpenses * 12}
              </p>
              <hr className="my-2" />
              <p className="lead">Total goals costs: ${gGoalsCost}</p>
              <hr className="my-2" />
              <p className="lead">
                Cost of goals per month: ${goalsCostPerMont}
              </p>
              <hr className="my-2" />
              <p className="h5 mb-4">
                Total expenses per month: $
                {Number(goalsCostPerMont) + Number(gExpenses)}
              </p>
            </div>
          </div>

          {/* CALCULATE CAPITAL NEEDED */}
          <div className="card-footer">
            <p className="h5">Desired interest</p>
            <form onSubmit={onSubmitFormOne}>
              <input
                type="number"
                name="desiredInterest"
                className="form-control"
                value={desiredInterest}
                onChange={onChangeInteres}
              />
              <button className="btn btn-primary mt-2">Done</button>
            </form>
            <p className="h5 mt-4">
              Capital invested needed: ${Number(capitalNeeded)} (Interest in{" "}
              {desiredInterest}%)
            </p>
            <p className="lead">
              This digit represents the capital invested at a certain interest
              necessary to cover all expenses without working.
            </p>
            <hr className="my-2" />
            <p className="lead">
              {estimatedYears} years of savings money would be enough to reach
              the necessary capital to invest.
            </p>
          </div>

          <div className="card-footer mt-4">
            <p>- All products was calculated in american dollars.</p>
          </div>

          <hr className="my-4" />

          {/* CALCULATE COST OF LIVING PLACE */}
          <div className="card-body mt-2">
            <p className="h4">
              Calculate cost of living place
              <i className="lead">
                {" "}
                (only if you want to move to a place to live)
              </i>
            </p>
            <p className="mb-4">
              <b>Important:</b> You must first calculate the capital needed (up
              in the page).
            </p>
            <div className="jumbotron-fluid">
              <form onSubmit={onSubmitFormTwo}>
                <div className="form-group">
                  <p className="lead">CLI of you current city or country:</p>
                  <p className="m-2">Example: Belo Horizonte = 52</p>
                  <input
                    type="number"
                    name="currentCLI"
                    className="form-control mb-4"
                    placeholder="Ex: Belo Horizonte = 52"
                    onChange={onChangeCLI}
                    value={currentCLI}
                  />
                </div>
                <div className="form-group">
                  <p className="lead">
                    CLI of the city or country where you want to live:
                  </p>
                  <p className="m-2">Example: Toronto = 86</p>
                  <input
                    type="number"
                    name="futureCLI"
                    className="form-control mb-2"
                    placeholder="Ex: Toronto = 86"
                    onChange={onChangeCLI}
                    value={futureCLI}
                  />
                </div>
                <button className="btn btn-primary">Calculate</button>
              </form>
              <p className="mt-4 h5">
                If you change your place to live, the new necessary invested
                capital would be ${capitalNeededNewCLI}
              </p>
              <p className="h5">
                Now you need save money for {estimatedYears} years
              </p>
              <button className="btn btn-primary" onClick={clearValues}>
                Clear values or recalculate
              </button>
            </div>
          </div>

          <div className="card-footer mt-2">
            <i className="fs-5">
              CLI: Indicator that measures the current and future economic
              activity of an area
            </i>
          </div>
        </div>
      </div>

    );
  }
}

export default Calculator;
