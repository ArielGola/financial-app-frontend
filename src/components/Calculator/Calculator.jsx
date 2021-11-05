import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { format } from 'timeago.js';
import {  } from '../../helpers/calculatorCompHelpers';

function Calculator() {

    useEffect(() => {
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

    async function getData() {
            const expenses = await Axios.get('http://localhost:4000/api/financial/expenses');

            const goalsAxios = await Axios.get('http://localhost:4000/api/financial/goals');

            setExpenses(expenses.data);
            setGoals(goalsAxios.data);

            calculateExpenses();
            calculateIncomes();
            calculateGoalsCosts();
            calculateGoalsCostsPerMonth();
            calculateCapitalNeeded();
    };

    function calculateExpenses() { // posible export
        // Expenses
        try {
            let mortgageRental;
            if (expenses[0].apartment.mortgage) {
                mortgageRental = expenses[0].apartment.mortgage;
                return;
            };
            if (expenses[0].apartment.rental) {
                mortgageRental = expenses[0].apartment.rental;
                return;
            };
            const totalExpenses = 
                mortgageRental +
                expenses[0].childcare +
                expenses[0].clothing +
                expenses[0].transport +
                expenses[0].services +
                expenses[0].markets +
                expenses[0].restaurants +
                expenses[0].leisure +
                expenses[0].others;
            
            setgExpenses(totalExpenses);
            
        } catch (error) {
            console.log(error);
        }
    };

    function calculateIncomes() { // posible export
        // Incomes
        try {
            const totalIncomes = 
                expenses[0].incomes.salary +
                expenses[0].incomes.otherIncome;
            
            setIncomes(totalIncomes);
            
        } catch (error) {
            console.log(error);
        }
    };

    function calculateGoalsCosts() { // posible export
        // Goals expenses
        let goalsCosts = 0;
        
        if (!goals) {
            setgGoalsCost(goalsCosts);
        } else {
            for (let i = 0; i < goals.length; i++) {
                let cost = goals[i].cost;
                goalsCosts = goalsCosts + cost;
            }
    
            setgGoalsCost(goalsCosts);
        };
    };

    function calculateGoalsCostsPerMonth() { // posible export
        let costOfGoalsPerMonth = 0;
        let countMonths = 0;

        if (!goals) {
            setGoalsCostPerMont(0);
        } else {

            for (let i = 0; i < goals.length; i++) {
                let dateGoal = new Date(goals[i].deadline);

                let months = format(dateGoal);

                let divideMonths = months.split(' ');

                let division;

                if (divideMonths.includes('year') || divideMonths.includes('years')) {

                    countMonths = Number(divideMonths[1]) * 12;
                    division = (goals[i].cost / countMonths);

                } else if (divideMonths.includes('month') || divideMonths.includes('months')) {

                    countMonths = Number(divideMonths[1]);
                    division = (goals[i].cost / countMonths);

                } else if (divideMonths.includes('week') || divideMonths.includes('weeks')) {

                    division = Number(goals[i].cost);

                } else if (divideMonths.includes('day') || divideMonths.includes('days')) {

                    division = Number(goals[i].cost);

                } else if (divideMonths.includes('ago')) {

                    division = 0;

                } else {
                    division = 0;
                };
                
                costOfGoalsPerMonth = costOfGoalsPerMonth + division;

            }

            setGoalsCostPerMont(costOfGoalsPerMonth.toFixed());
        };
    };

    function calculateCapitalNeeded() { // posible export
        let totalExpensesPerMonth = Number(goalsCostPerMont) + Number(gExpenses);
        let capitalNeeded = (totalExpensesPerMonth * 12) * (100 / desiredInterest);

        if (capitalNeeded === Infinity || capitalNeeded === null){
            setCapitalNeeded(0);
        } else {     
            setCapitalNeeded(capitalNeeded.toFixed());
        };
    };

    function calculateEstimatedYears() { // posible export
        let balance = Number(incomes) * 12 - Number(gExpenses) * 12;
        let estimatedYears;

        if (capitalNeededNewCLI === 0) {
            estimatedYears = capitalNeeded / balance;
        } else {
            estimatedYears = capitalNeededNewCLI / balance;
        };

        if (estimatedYears === Infinity || estimatedYears === null){
            setEstimatedYears(0);
        } else {
            setEstimatedYears(estimatedYears.toFixed());
        };
    };

    function calculateCostOfLivingPlace() { // posible export
        let differenceCLI = currentCLI / futureCLI;
        let capitalNeededWithCLI = capitalNeeded / differenceCLI;

        setCapitalNeededNewCLI(capitalNeededWithCLI.toFixed());
    };


    const onChangeInteres = (e) => {
        setDesiredInterest(e.target.value);
    };

    const onSubmitFormOne =  async (e) => {
        e.preventDefault();

        calculateCapitalNeeded();
        calculateEstimatedYears();
    };

    const onChangeCLI = (e) => {
        if (e.target.name === "currentCLI") setCurrentCLI(e.target.value);
        if (e.target.name === "futureCLI") setFutureCLI(e.target.value);
    };

    const onSubmitFormTwo = async (e) => {
        e.preventDefault();

        calculateCostOfLivingPlace();
        calculateEstimatedYears();
    };

    if (!expenses || !goals) {
        return (
            <div className="col-md-8 offset-md-2">
                <div className="card-body bg-light">
                    <h3 className="card-title">You haven't entered any expenses yet</h3>
                </div>
            </div>
        )
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
                                <p className="h5 mb-4">Anual balance: ${(incomes * 12) - (gExpenses * 12)}</p>
                                <hr className="my-2" />
                                <p className="lead">Total goals costs: ${gGoalsCost}</p>
                                <hr className="my-2" />
                                <p className="lead">Cost of goals per month: ${goalsCostPerMont}</p>
                                <hr className="my-2" />
                                <p className="h5 mb-4">Total expenses per month: ${Number(goalsCostPerMont) + Number(gExpenses)}</p>
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
                                Capital invested needed: ${capitalNeeded} (Interest in {desiredInterest}%)
                            </p>
                            <p className="lead">
                                This digit represents the capital invested at a certain interest necessary to cover all expenses without working.
                            </p>
                            <hr className="my-2" />
                            <p className="lead">
                                {estimatedYears} years of savings money would be enough to reach the necessary capital to invest.
                            </p>
                        </div>

                        <div className="card-footer mt-4">
                            <p>- All products was calculated in american dollars.</p>
                        </div>

                        <hr className="my-4" />


                        {/* CALCULATE COST OF LIVING PLACE */}
                        <div className="card-body mt-2">
                            <p className="h4">Calculate cost of living place 
                                <i className="lead"> (only if you want to move to a place to live)</i>
                            </p>
                            <p className="mb-4"> 
                                <b>Important:</b>  You must first calculate the capital needed (up in the page).
                            </p>
                            <div className="jumbotron-fluid">
                                <form onSubmit={onSubmitFormTwo}>
                                    <div className="form-group">
                                        <p className="lead">CLI of you current city or country:</p>
                                        <input 
                                            type="number" 
                                            name="currentCLI" 
                                            className="form-control" 
                                            placeholder="Ex: Belo Horizonte = 52"
                                            onChange={onChangeCLI}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <p className="lead">CLI of the city or country where you want to live:</p>
                                        <input 
                                            type="number" 
                                            name="futureCLI" 
                                            className="form-control"
                                            placeholder="Ex: Toronto = 86" 
                                            onChange={onChangeCLI}
                                        />
                                    </div>
                                    <button className="btn btn-primary">
                                        Calculate
                                    </button>
                                </form>
                                <p className="mt-4 h5">
                                    If you change your place to live, the new necessary invested capital would be $
                                    {
                                        capitalNeededNewCLI
                                    }
                                </p>
                                <p className="h5">
                                    Now you need save money for {estimatedYears} years
                                </p>
                            </div>
                        </div>

                        <div className="card-footer mt-2">
                            <i className="fs-5">CLI: Indicator that measures the current and future economic activity of an area</i>
                        </div>


                    </div>
                </div>
        )
    }
}

export default Calculator;
