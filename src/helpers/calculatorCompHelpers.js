import { format } from 'timeago.js';


export function calculateExpensesF(expenses) {
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
        
        return totalExpenses;
        
    } catch (error) {
        console.log(error.message);
        return error;
    }
};


export function calculateIncomesF(expenses) {
    try {

        const totalIncomes = 
        expenses[0].incomes.salary +
        expenses[0].incomes.otherIncome;

        return totalIncomes;

    } catch (error) {
        console.log(error.message);
        return error;
    }
};


export function calculateGoalsCostsF(goals) {
    try {

        let goalsCosts = 0;
        
        if (!goals) {
            return 0;
        } else {
            for (let i = 0; i < goals.length; i++) {
                let cost = goals[i].cost;
                goalsCosts = goalsCosts + cost;
            }
    
            return goalsCosts;
        };

    } catch (error) {
        console.log(error.message);
        return error;
    }
};


export function calculateGoalsCostsPerMonthF(goals) {
    try {

        let costOfGoalsPerMonth = 0;
        let countMonths = 0;
    
        if (!goals) {
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
    
            return costOfGoalsPerMonth.toFixed();
        };

    } catch (error) {
        console.log(error.message);
        return error;
    }
};


export function calculateCapitalNeededF(goalsCostPerMonth, gExpenses, desiredInterest) {
    try {

        let totalExpensesPerMonth = Number(goalsCostPerMonth) + Number(gExpenses);
        let capitalNeeded = (totalExpensesPerMonth * 12) * (100 / desiredInterest);
    
        if (capitalNeeded === Infinity || capitalNeeded === null){
            return 0;
        } else {
            return capitalNeeded.toFixed();
        };
        
    } catch (error) {
        console.log(error.message);
        return error;
    }
};


export function calculateEstimatedYearsF(incomes, gExpenses, capitalNeededNewCLI, capitalNeeded) {
    try {

        let balance = Number(incomes) * 12 - Number(gExpenses) * 12;
        let estimatedYears;
    
        if (capitalNeededNewCLI === 0) {
            estimatedYears = capitalNeeded / balance;
        } else {
            estimatedYears = capitalNeededNewCLI / balance;
        };
    
        if (estimatedYears === Infinity || estimatedYears === null){
            return 0;
        } else {
            return estimatedYears.toFixed();
        };
        
    } catch (error) {
        console.log(error.message);
        return error;
    }
};


export function calculateCostOfLivingPlaceF(currentCLI, futureCLI, capitalNeeded) {
    try {
    
        let differenceCLI = currentCLI / futureCLI;
        let capitalNeededWithCLI = capitalNeeded / differenceCLI;
    
        return capitalNeededWithCLI.toFixed();
        
    } catch (error) {
        console.log(error.message);
        return error;
    }
};