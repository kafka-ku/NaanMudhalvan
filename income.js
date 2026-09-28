const incomeForm = document.getElementById("incomeForm");

const incomeSource = document.getElementById("incomeSource");
const incomeAmount = document.getElementById("incomeAmount");
const incomeDate = document.getElementById("incomeDate");

const incomeList = document.getElementById("incomeList");
const clearIncomeButton = document.getElementById("clearIncome");


/* Get saved income records */

let incomes = JSON.parse(
    localStorage.getItem("incomeTransactions")
) || [];


/* Today's date */

const today = new Date().toISOString().split("T")[0];

incomeDate.value = today;


/* Add Income */

incomeForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const source = incomeSource.value;
    const amount = Number(incomeAmount.value);
    const date = incomeDate.value;


    /* Validation */

    if (
        source === "" ||
        amount <= 0 ||
        date === ""
    ) {

        alert("Please fill all fields correctly.");

        return;
    }


    /* Create income */

    const income = {

        id: Date.now(),

        source: source,

        amount: amount,

        date: date

    };


    /* Add to array */

    incomes.push(income);


    /* Save */

    saveIncomes();


    /* Display */

    displayIncomes();


    /* Clear form */

    incomeForm.reset();

    incomeDate.value = today;

});


/* Display Income */

function displayIncomes() {

    incomeList.innerHTML = "";


    /* No income */

    if (incomes.length === 0) {

        incomeList.innerHTML = `
            <div class="empty-message">
                No income records yet.
            </div>
        `;

        return;
    }


    /* Latest income first */

    const reversedIncomes = [...incomes].reverse();


    reversedIncomes.forEach(function (income) {

        const incomeElement = document.createElement("div");

        incomeElement.className = "income-item";


        incomeElement.innerHTML = `

            <div class="income-info">

                <h3>${income.source}</h3>

                <p>
                    Date: ${formatDate(income.date)}
                </p>

            </div>


            <div class="income-right">

                <div class="income-amount">
                    + ₹${income.amount.toLocaleString("en-IN")}
                </div>


                <button
                    class="delete-btn"
                    onclick="deleteIncome(${income.id})"
                >
                    Delete
                </button>

            </div>

        `;


        incomeList.appendChild(incomeElement);

    });

}


/* Delete Income */

function deleteIncome(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this income?"
    );


    if (!confirmDelete) {
        return;
    }


    incomes = incomes.filter(function (income) {

        return income.id !== id;

    });


    saveIncomes();

    displayIncomes();

}


/* Clear All Income */

clearIncomeButton.addEventListener("click", function () {

    if (incomes.length === 0) {

        alert("There are no income records to clear.");

        return;
    }


    const confirmClear = confirm(
        "Are you sure you want to delete all income records?"
    );


    if (!confirmClear) {
        return;
    }


    incomes = [];


    saveIncomes();

    displayIncomes();

});


/* Save Income */

function saveIncomes() {

    localStorage.setItem(
        "incomeTransactions",
        JSON.stringify(incomes)
    );

}


/* Format Date */

function formatDate(date) {

    const dateObject = new Date(date + "T00:00:00");


    return dateObject.toLocaleDateString("en-IN", {

        day: "2-digit",

        month: "short",

        year: "numeric"

    });

}


/* Initial Load */

displayIncomes();