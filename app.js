//variable for the calc btn
const calc = document
  .getElementById("loan-form")
  .addEventListener("submit", showHide);
//function to show and hide loadeing and results
function showHide(e) {
  document.getElementById("loading").style.display = "block";
  document.getElementById("results").style.display = "none";
  setTimeout(calculateResults, 2500);
  e.preventDefault();
}
//function to calculate results
function calculateResults() {
  const loanAmountEL = document.getElementById("amount");
  const yearsEL = document.getElementById("years");
  const interestEL = document.getElementById("interest");
  const monthlyPmtEL = document.getElementById("monthly-payment");
  const totalPmtEL = document.getElementById("total-payment");
  const totalIntEL = document.getElementById("total-interest");

  const principalValue = parseFloat(loanAmountEL.value);
  const calcIntValue = parseFloat(interestEL.value) / 100 / 12;
  const calcNumberOfPaymentsValue = parseFloat(yearsEL.value) * 12;

  const x = Math.pow(1 + calcIntValue, calcNumberOfPaymentsValue);
  const monthlyPmtCalc = (principalValue * x * calcIntValue) / (x - 1);

  if (isFinite(monthlyPmtCalc)) {
    monthlyPmtEL.value = monthlyPmtCalc.toFixed(2);
    totalPmtEL.value = (monthlyPmtCalc * calcNumberOfPaymentsValue).toFixed(2);
    totalIntEL.value = (
      monthlyPmtCalc * calcNumberOfPaymentsValue -
      principalValue
    ).toFixed(2);
    document.getElementById("loading").style.display = "none";
    document.getElementById("results").style.display = "block";
  } else {
    showErrorMsg("Please check your entered values");
  }
}

function showErrorMsg(error) {
  //creates a new div with the error message
  const errorDiv = document.createElement("div");
  //get elements to relate to position of new div
  const heading = document.querySelector(".heading");
  const card = document.querySelector(".card");
  //adds a class to the new div
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));

  //insert new div before heading on the card
  card.insertBefore(errorDiv, heading);
  //clear error msg after 4 seconds
  setTimeout(clearErrMsg, 4000);
}
function clearErrMsg() {
  document.querySelector(".alert").remove();
}
