const expenseForm = document.getElementById("expenseForm");

const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

const balanceDisplay = document.getElementById("balance");
const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");

const transactionList = document.getElementById("transactionList");
const clearAllButton = document.getElementById("clearAll");


let transactions = JSON.parse(
    localStorage.getItem("expenseTransactions")
) || [];


/* Display today's date */

const today = new Date().toISOString().split("T")[0];

dateInput.value = today;


/* Add Expense */

expenseForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;


    if (
        name === "" ||
        amount <= 0 ||
        category === "" ||
        date === ""
    ) {
        alert("Please fill all fields correctly.");
        return;
    }


    const transaction = {

        id: Date.now(),

        name: name,

        amount: amount,

        category: category,

        date: date

    };


    transactions.push(transaction);


    saveTransactions();

    displayTransactions();

    updateSummary();


    /* Clear form */

    expenseForm.reset();

    dateInput.value = today;

});


/* Display Transactions */

function displayTransactions() {

    transactionList.innerHTML = "";


    if (transactions.length === 0) {

        transactionList.innerHTML = `
            <div class="empty-message">
                No transactions yet.
            </div>
        `;

        return;
    }


    /* Latest transaction first */

    const reversedTransactions = [...transactions].reverse();


    reversedTransactions.forEach(function (transaction) {

        const transactionElement = document.createElement("div");

        transactionElement.className = "transaction";


        transactionElement.innerHTML = `

            <div class="transaction-info">

                <h3>${transaction.name}</h3>

                <p>Category: ${transaction.category}</p>

                <p>Date: ${formatDate(transaction.date)}</p>

            </div>


            <div class="transaction-right">

                <div class="transaction-amount">
                    - ₹${transaction.amount.toLocaleString("en-IN")}
                </div>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})"
                >
                    Delete
                </button>

            </div>

        `;


        transactionList.appendChild(transactionElement);

    });

}


/* Update Summary */

function updateSummary() {

    let totalExpense = 0;


    transactions.forEach(function (transaction) {

        totalExpense += transaction.amount;

    });


    const totalIncome = 0;

    const balance = totalIncome - totalExpense;


    incomeDisplay.textContent =
        `₹${totalIncome.toLocaleString("en-IN")}`;


    expenseDisplay.textContent =
        `₹${totalExpense.toLocaleString("en-IN")}`;


    balanceDisplay.textContent =
        `₹${balance.toLocaleString("en-IN")}`;

}


/* Delete Transaction */

function deleteTransaction(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this expense?"
    );


    if (!confirmDelete) {
        return;
    }


    transactions = transactions.filter(function (transaction) {

        return transaction.id !== id;

    });


    saveTransactions();

    displayTransactions();

    updateSummary();

}


/* Clear All */

clearAllButton.addEventListener("click", function () {

    if (transactions.length === 0) {

        alert("There are no transactions to clear.");

        return;
    }


    const confirmClear = confirm(
        "Are you sure you want to delete all expenses?"
    );


    if (!confirmClear) {
        return;
    }


    transactions = [];


    saveTransactions();

    displayTransactions();

    updateSummary();

});


/* Save to Local Storage */

function saveTransactions() {

    localStorage.setItem(
        "expenseTransactions",
        JSON.stringify(transactions)
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

displayTransactions();

updateSummary();