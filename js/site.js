//get values on btnCalculate press / controller
function getValues() {
    //reset cols
   

    //collect & parse data
    let loanAmount = parseFloat(document.getElementById('loanAmount').value);
    let payments = parseFloat(document.getElementById('month').value);
    //allow for float later
    let rate = parseFloat(document.getElementById('rate').value);

    //validate data

    //pass data to calculate function
    let results = calculateLoan(loanAmount, payments, rate);

    //pass in calculations display data in table
    displayData(results);
}

//calculate amounts / logic
function calculateLoan(loanAmount, payments, rate) {

    //object for months
    let resultsObject = {};

    //create variables
    let totalInterest = 0;
    let balance = loanAmount;
    let interestPayment = 0
    let principalPayment;

    //monthly calculations
    let monthlyPayment = parseFloat((loanAmount * (rate / 1200)) / (1 - (1 + (rate / 1200)) ** (-Math.abs(payments))));

    //string to store in html
    let htmlString = ""

    //loop through number of payments do calculations
    for (let i = 0; i <= payments; i++) {
        let month = i;

        interestPayment = parseFloat(balance * (rate / 1200));
        principalPayment = parseFloat(monthlyPayment - (balance * (rate / 1200)));
        totalInterest = parseFloat((totalInterest + interestPayment));
        totalInterest = parseFloat(totalInterest);
        balance -= principalPayment;
        balance = Math.abs(parseFloat(balance));

        //concatinate on to htmlString the results of the calculations
        htmlString += `<tr><td>${month+1}</td><td>${monthlyPayment.toFixed(2)}</td><td>${principalPayment.toFixed(2)}</td><td>${interestPayment.toFixed(2)}</td><td>${totalInterest.toFixed(2)}</td><td>${balance.toFixed(2)}</td></tr>`
    }

    let totalCost = loanAmount + totalInterest;

    // display calculated variables to proper positions while inside function
   
    resultsObject.monthlyPayment = (monthlyPayment);
    resultsObject.principalPayment = (principalPayment);
    resultsObject.totalInterest = (totalInterest);
    resultsObject.totalCost = (totalCost);

    resultsObject.htmlString = htmlString;

    //return results object
    return resultsObject;
}

//display the data in a table / view
function displayData(resultsObject) {
    document.getElementById("monthlyPayment").innerHTML = resultsObject.monthlyPayment;
    document.getElementById("totalPrincipal").innerHTML = resultsObject.principalPayment;
    document.getElementById("totalInterest").innerHTML = resultsObject.totalInterest;
    document.getElementById("totalCost").innerHTML = resultsObject.totalCost;
    //creates table
    document.getElementById("results").innerHTML = resultsObject.htmlString;
}
