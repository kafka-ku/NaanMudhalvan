/* =================================
   Analytics Module
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

const incomeDisplay =
    document.getElementById("analyticsIncome");

const expenseDisplay =
    document.getElementById("analyticsExpense");

const savingsDisplay =
    document.getElementById("analyticsSavings");

const percentageDisplay =
    document.getElementById("expensePercentage");

const monthlyTable =
    document.getElementById("monthlyTable");


/* =================================
   Calculate Total
================================= */

function calculateTotal(list) {

    let total = 0;


    list.forEach(function (item) {

        total += Number(item.amount);

    });


    return total;
}


/* =================================
   Update Overview
================================= */

function updateOverview() {

    const totalIncome =
        calculateTotal(incomes);


    const totalExpense =
        calculateTotal(expenses);


    const savings =
        totalIncome - totalExpense;


    let expensePercentage = 0;


    if (totalIncome > 0) {

        expensePercentage =
            (totalExpense / totalIncome) * 100;

    }


    incomeDisplay.textContent =
        `₹${totalIncome.toLocaleString("en-IN")}`;


    expenseDisplay.textContent =
        `₹${totalExpense.toLocaleString("en-IN")}`;


    savingsDisplay.textContent =
        `₹${savings.toLocaleString("en-IN")}`;


    percentageDisplay.textContent =
        `${expensePercentage.toFixed(1)}%`;
}


/* =================================
   Income vs Expense Chart
================================= */

function createIncomeExpenseChart() {

    const canvas =
        document.getElementById(
            "incomeExpenseChart"
        );


    const totalIncome =
        calculateTotal(incomes);


    const totalExpense =
        calculateTotal(expenses);


    new Chart(canvas, {

        type: "bar",

        data: {

            labels: [
                "Income",
                "Expense"
            ],

            datasets: [

                {

                    label: "Amount",

                    data: [
                        totalIncome,
                        totalExpense
                    ]

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}


/* =================================
   Category-wise Expense Chart
================================= */

function createCategoryExpenseChart() {

    const canvas =
        document.getElementById(
            "categoryExpenseChart"
        );


    const categories = {};


    expenses.forEach(function (expense) {

        const category =
            expense.category;


        if (!categories[category]) {

            categories[category] = 0;

        }


        categories[category] +=
            Number(expense.amount);

    });


    const labels =
        Object.keys(categories);


    const values =
        Object.values(categories);


    if (labels.length === 0) {

        labels.push("No Expense");

        values.push(0);

    }


    new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: labels,

            datasets: [

                {

                    label: "Expenses",

                    data: values

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}


/* =================================
   Monthly Analysis
================================= */

function createMonthlyAnalysis() {

    const monthlyData = {};


    /* Income */

    incomes.forEach(function (income) {

        const date =
            new Date(
                income.date + "T00:00:00"
            );


        const month =
            date.toLocaleDateString(
                "en-IN",
                {
                    month: "short",
                    year: "numeric"
                }
            );


        if (!monthlyData[month]) {

            monthlyData[month] = {

                income: 0,

                expense: 0

            };

        }


        monthlyData[month].income +=
            Number(income.amount);

    });


    /* Expense */

    expenses.forEach(function (expense) {

        const date =
            new Date(
                expense.date + "T00:00:00"
            );


        const month =
            date.toLocaleDateString(
                "en-IN",
                {
                    month: "short",
                    year: "numeric"
                }
            );


        if (!monthlyData[month]) {

            monthlyData[month] = {

                income: 0,

                expense: 0

            };

        }


        monthlyData[month].expense +=
            Number(expense.amount);

    });


    monthlyTable.innerHTML = "";


    const months =
        Object.keys(monthlyData);


    if (months.length === 0) {

        monthlyTable.innerHTML = `

            <tr>

                <td colspan="4">
                    No data available
                </td>

            </tr>

        `;

        return;

    }


    months.reverse();


    months.forEach(function (month) {

        const income =
            monthlyData[month].income;


        const expense =
            monthlyData[month].expense;


        const savings =
            income - expense;


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${month}
            </td>

            <td>
                ₹${income.toLocaleString("en-IN")}
            </td>

            <td>
                ₹${expense.toLocaleString("en-IN")}
            </td>

            <td>
                ₹${savings.toLocaleString("en-IN")}
            </td>

        `;


        monthlyTable.appendChild(row);

    });

}


/* =================================
   Refresh Data
================================= */

function refreshAnalytics() {

    incomes = JSON.parse(
        localStorage.getItem("incomeTransactions")
    ) || [];


    expenses = JSON.parse(
        localStorage.getItem("expenseTransactions")
    ) || [];


    updateOverview();

    createIncomeExpenseChart();

    createCategoryExpenseChart();

    createMonthlyAnalysis();

}


/* =================================
   Start Analytics
================================= */

refreshAnalytics();