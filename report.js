/* =================================
   Reports Module
================================= */


/* Get saved data */

let incomes = JSON.parse(
    localStorage.getItem("incomeTransactions")
) || [];


let expenses = JSON.parse(
    localStorage.getItem("expenseTransactions")
) || [];


/* =================================
   Elements
================================= */

const fromDateInput =
    document.getElementById("fromDate");

const toDateInput =
    document.getElementById("toDate");

const filterButton =
    document.getElementById("filterButton");

const resetButton =
    document.getElementById("resetButton");

const printButton =
    document.getElementById("printReport");


const reportIncome =
    document.getElementById("reportIncome");

const reportExpense =
    document.getElementById("reportExpense");

const reportSavings =
    document.getElementById("reportSavings");


const incomeCount =
    document.getElementById("incomeCount");

const expenseCount =
    document.getElementById("expenseCount");


const incomeReportList =
    document.getElementById("incomeReportList");

const expenseReportList =
    document.getElementById("expenseReportList");

const categorySummary =
    document.getElementById("categorySummary");


/* =================================
   Format Currency
================================= */

function formatCurrency(amount) {

    return `₹${Number(amount).toLocaleString("en-IN")}`;

}


/* =================================
   Format Date
================================= */

function formatDate(date) {

    const dateObject =
        new Date(date + "T00:00:00");


    return dateObject.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =================================
   Filter Records
================================= */

function filterRecords(records) {

    const fromDate =
        fromDateInput.value;

    const toDate =
        toDateInput.value;


    return records.filter(function (record) {

        const recordDate =
            record.date;


        if (
            fromDate !== "" &&
            recordDate < fromDate
        ) {

            return false;

        }


        if (
            toDate !== "" &&
            recordDate > toDate
        ) {

            return false;

        }


        return true;

    });

}


/* =================================
   Calculate Total
================================= */

function calculateTotal(records) {

    let total = 0;


    records.forEach(function (record) {

        total += Number(record.amount);

    });


    return total;

}


/* =================================
   Update Summary
================================= */

function updateSummary(filteredIncomes, filteredExpenses) {

    const totalIncome =
        calculateTotal(filteredIncomes);


    const totalExpense =
        calculateTotal(filteredExpenses);


    const totalSavings =
        totalIncome - totalExpense;


    reportIncome.textContent =
        formatCurrency(totalIncome);


    reportExpense.textContent =
        formatCurrency(totalExpense);


    reportSavings.textContent =
        formatCurrency(totalSavings);


    incomeCount.textContent =
        `${filteredIncomes.length} Records`;


    expenseCount.textContent =
        `${filteredExpenses.length} Records`;

}


/* =================================
   Display Income Report
================================= */

function displayIncomeReport(records) {

    incomeReportList.innerHTML = "";


    if (records.length === 0) {

        incomeReportList.innerHTML = `

            <tr>

                <td colspan="4">
                    No income records found.
                </td>

            </tr>

        `;

        return;

    }


    records.forEach(function (income, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${index + 1}
            </td>

            <td>
                ${income.source}
            </td>

            <td class="income-table-amount">
                + ${formatCurrency(income.amount)}
            </td>

            <td>
                ${formatDate(income.date)}
            </td>

        `;


        incomeReportList.appendChild(row);

    });

}


/* =================================
   Display Expense Report
================================= */

function displayExpenseReport(records) {

    expenseReportList.innerHTML = "";


    if (records.length === 0) {

        expenseReportList.innerHTML = `

            <tr>

                <td colspan="5">
                    No expense records found.
                </td>

            </tr>

        `;

        return;

    }


    records.forEach(function (expense, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${index + 1}
            </td>

            <td>
                ${expense.name}
            </td>

            <td>
                ${expense.category}
            </td>

            <td class="expense-table-amount">
                - ${formatCurrency(expense.amount)}
            </td>

            <td>
                ${formatDate(expense.date)}
            </td>

        `;


        expenseReportList.appendChild(row);

    });

}


/* =================================
   Category Summary
================================= */

function displayCategorySummary(records) {

    categorySummary.innerHTML = "";


    const categories = {};


    records.forEach(function (expense) {

        const category =
            expense.category;


        if (!categories[category]) {

            categories[category] = 0;

        }


        categories[category] +=
            Number(expense.amount);

    });


    const categoryNames =
        Object.keys(categories);


    if (categoryNames.length === 0) {

        categorySummary.innerHTML = `

            <div class="empty-message">
                No category data available.
            </div>

        `;

        return;

    }


    categoryNames.forEach(function (category) {

        const card =
            document.createElement("div");


        card.className =
            "category-card";


        card.innerHTML = `

            <h3>
                ${category}
            </h3>

            <p>
                ${formatCurrency(categories[category])}
            </p>

        `;


        categorySummary.appendChild(card);

    });

}


/* =================================
   Generate Report
================================= */

function generateReport() {

    const filteredIncomes =
        filterRecords(incomes);


    const filteredExpenses =
        filterRecords(expenses);


    updateSummary(
        filteredIncomes,
        filteredExpenses
    );


    displayIncomeReport(
        filteredIncomes
    );


    displayExpenseReport(
        filteredExpenses
    );


    displayCategorySummary(
        filteredExpenses
    );

}


/* =================================
   Apply Filter
================================= */

filterButton.addEventListener(
    "click",
    function () {

        if (
            fromDateInput.value !== "" &&
            toDateInput.value !== "" &&
            fromDateInput.value > toDateInput.value
        ) {

            alert(
                "From Date cannot be greater than To Date."
            );

            return;

        }


        generateReport();

    }
);


/* =================================
   Reset Filter
================================= */

resetButton.addEventListener(
    "click",
    function () {

        fromDateInput.value = "";

        toDateInput.value = "";

        generateReport();

    }
);


/* =================================
   Print Report
================================= */

printButton.addEventListener(
    "click",
    function () {

        window.print();

    }
);


/* =================================
   Refresh Data
================================= */

function refreshReports() {

    incomes = JSON.parse(
        localStorage.getItem("incomeTransactions")
    ) || [];


    expenses = JSON.parse(
        localStorage.getItem("expenseTransactions")
    ) || [];


    generateReport();

}


/* =================================
   Initial Load
================================= */

refreshReports();