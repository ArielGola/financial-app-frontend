import { format } from 'timeago.js';


export function calculateExpensesF(expenses) { // posible export
    // Expenses
    try {
        let mortgageRental;
        if (expenses[0].apartment.mortgage) {
            mortgageRental = expenses[0].apartment.mortgage;
        };
        if (expenses[0].apartment.rental) {
            mortgageRental = expenses[0].apartment.rental;
        };
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
        
        //setgExpenses(totalExpenses);
        return totalExpenses;
        
    } catch (error) {
        console.log(error);
    }
};

export function calculateIncomesF(expenses) {
    // Incomes
    const totalIncomes = 
        expenses[0].incomes.salary +
        expenses[0].incomes.otherIncome;
    
    //setIncomes(totalIncomes);
    return totalIncomes;
};

export function calculateGoalsCostsF(goals) {
    // Goals expenses
    let goalsCosts = 0;
    
    if (!goals) {
        //setgGoalsCost(goalsCosts);
        return 0;
    } else {
        for (let i = 0; i < goals.length; i++) {
            let cost = goals[i].cost;
            goalsCosts = goalsCosts + cost;
        }

        //setgGoalsCost(goalsCosts);
        return goalsCosts;
    };
};

export function calculateGoalsCostsPerMonthF(goals) {
    let costOfGoalsPerMonth = 0;
    let countMonths = 0;

    if (!goals) {
        //setGoalsCostPerMont(0);
        return 0;
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

        //setGoalsCostPerMont(costOfGoalsPerMonth.toFixed());
        return costOfGoalsPerMonth.toFixed();
    };
};

export function calculateCapitalNeededF(goalsCostPerMonth, gExpenses, desiredInterest) {

    let totalExpensesPerMonth = Number(goalsCostPerMonth) + Number(gExpenses);
    let capitalNeeded = (totalExpensesPerMonth * 12) * (100 / desiredInterest);

    if (capitalNeeded === Infinity || capitalNeeded === null){
        //setCapitalNeeded(0);
        return 0;
    } else {     
        //setCapitalNeeded(capitalNeeded.toFixed());
        return capitalNeeded.toFixed();
    };
};

export function calculateEstimatedYearsF(incomes, gExpenses, capitalNeededNewCLI, capitalNeeded) {

    let balance = Number(incomes) * 12 - Number(gExpenses) * 12;
    let estimatedYears;

    if (capitalNeededNewCLI === 0) {
        estimatedYears = capitalNeeded / balance;
    } else {
        estimatedYears = capitalNeededNewCLI / balance;
    };

    if (estimatedYears === Infinity || estimatedYears === null){
        //setEstimatedYears(0);
        return 0;
    } else {
        //setEstimatedYears(estimatedYears.toFixed());
        return estimatedYears.toFixed();
    };
};

export function calculateCostOfLivingPlaceF(currentCLI, futureCLI, capitalNeeded) {
    let differenceCLI = currentCLI / futureCLI;
    let capitalNeededWithCLI = capitalNeeded / differenceCLI;

    //setCapitalNeededNewCLI(capitalNeededWithCLI.toFixed());
    return capitalNeededWithCLI.toFixed();
};