// text input elements
const totalBill = document.getElementById('total-bill');
const customTip = document.getElementById('tip-custom');
const peopleNumber = document.getElementById('people-number');

// radio input elements
const tip = document.querySelectorAll('input[name="tip-percentage"]');

// output elements
const tipPerPerson = document.getElementById('tip-per-person');
const totalPerPerson = document.getElementById('total-per-person');

// button elements
const resetBtn = document.getElementById('reset-btn');

// error message elements
const totalError = document.getElementById('total-error');
const customError = document.getElementById('custom-error');
const personError = document.getElementById('person-error');
const totalZero = document.getElementById('total-zero');
const personZero = document.getElementById('person-zero');

// input values
let billValue = 0.0;
let tipValue = 0;
let numOfPeopleValue = 0;

function getBill() {
    billValue = parseFloat(totalBill.value);
}

function getNumOfPeople() {
    numOfPeopleValue = parseInt(peopleNumber.value);
}

function getCustomTip() {
    tipValue = parseFloat(customTip.value);
}

function calculateTip(billValue, numOfPeopleValue, tipValue) {

    let bill = billValue;
    let numOfPeople = numOfPeopleValue;
    let tipPercentage = tipValue;

    let billPerPerson = bill / numOfPeople;

    let tipAmountPerPerson = billPerPerson * (tipPercentage / 100);

    let totalPerPerson = tipAmountPerPerson + billPerPerson;

    let display = {tip: (Math.round(tipAmountPerPerson * 100) / 100).toFixed(2),
                total: (Math.round(totalPerPerson * 100) / 100).toFixed(2)};
    
    return display;
}

function reset() {

    totalZero.style.display = 'none';
    totalError.style.display = 'none';
    personZero.style.display = 'none';
    personError.style.display = 'none';
    customError.style.display = 'none';

    customTip.classList.remove("invalid");
    totalBill.classList.remove("invalid");
    peopleNumber.classList.remove("invalid");

    totalBill.value = "";
    customTip.value = "";
    peopleNumber.value = "";

    tip.forEach(radio => {
        radio.checked = false;
    });

    tipPerPerson.innerHTML = "$0.00";
    totalPerPerson.innerHTML = "$0.00";

    resetBtn.disabled = true;
}

function checkErrors() {

    let totalFlag = false;
    let personFlag = false;
    let radioFlag = false;
    let isChecked = false;

    const numPattern = /^\d*\.?\d+$/; // matches any positive numerical values including floating point values

    // check errors in bill input field
    if (totalBill.value.trim() === "") {
        totalZero.style.display = 'block';
        totalError.style.display = 'none';
        totalBill.classList.add("invalid");
        totalFlag = true;
    }
    else if (!numPattern.test(billValue)) {
        totalZero.style.display = 'none';
        totalError.style.display = 'block';
        totalBill.classList.add("invalid");
        totalFlag = true;
    } else {
        totalZero.style.display = 'none';
        totalError.style.display = 'none';
        totalBill.classList.remove("invalid");
        totalFlag = false;
    }

    // check for errors in number of people input field
    if (peopleNumber.value.trim() === "") {
        personZero.style.display = 'block';
        personError.style.display = 'none';
        peopleNumber.classList.add("invalid");
        personFlag = true;
    }
    else if (!numPattern.test(numOfPeopleValue)) {
        personZero.style.display = 'none';
        personError.style.display = 'block';
        peopleNumber.classList.add("invalid");
        personFlag = true;
    } else {
        personZero.style.display = 'none';
        personError.style.display = 'none';
        peopleNumber.classList.remove("invalid");
        personFlag = false;
    }

    // check for errors in custom tip input field
    for (let index = 0; index < tip.length; index++) {
        if (tip[index].checked) {
            isChecked = true;
            break;
        }
    }

    if (!isChecked) {
        if (!numPattern.test(tipValue)) {
            customError.style.display = 'block';
            customTip.classList.add("invalid");
            radioFlag = true;
        } else {
            customError.style.display = 'none';
            customTip.classList.remove("invalid");
            radioFlag = false;
        }
    } else {
        customError.style.display = 'none';
        customTip.classList.remove("invalid");
        radioFlag = false;
    }

    let errorFlags = [totalFlag, personFlag, radioFlag]

    return errorFlags.some(Boolean);
}

function displayOutput() {
    let error = checkErrors();


    if(!error) {
        let display = calculateTip(billValue, numOfPeopleValue, tipValue);
        tipPerPerson.innerHTML = `$${display.tip}`;
        totalPerPerson.innerHTML = `$${display.total}`;
        resetBtn.disabled = false;
    }

}

totalBill.addEventListener("input", getBill);
peopleNumber.addEventListener("input", getNumOfPeople);
customTip.addEventListener("click", function() {

    for (let index = 0; index < tip.length; index++) {
        if (tip[index].checked) {
            tip[index].checked = false;
        }
    }

});

tip.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            customTip.value = "";
            tipValue = this.value;
            displayOutput();
        } else {
            tipValue = customTip.value;
            displayOutput();
        }

    });
});

resetBtn.addEventListener("click", reset);

