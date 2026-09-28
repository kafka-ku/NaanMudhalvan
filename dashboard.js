// ==============================
// Dashboard
// ==============================

document.addEventListener("DOMContentLoaded", function () {
    loadDashboard();
});


// ==============================
// Load Dashboard
// ==============================

function loadDashboard() {

    const incomeData = JSON.parse(
        localStorage.getItem("incomeTransactions")
    ) || [];

    const expenseData = JSON.parse(
        localStorage.getItem("expenseTransactions")
    ) || [];


    // ==============================
    // Total Income
    // ==============================

    const totalIncome = incomeData.reduce(function (total, item) {

        return total + Number(item.amount || 0);

    }, 0);


    // ==============================
    // Total Expense
    // ==============================

    const totalExpense = expenseData.reduce(function (total, item) {

        return total + Number(item.amount || 0);

    }, 0);


    // ==============================
    // Balance
    // ==============================

    const totalBalance =
        totalIncome - totalExpense;


    // ==============================
    // Display
    // ==============================

    document.getElementById("totalIncome").textContent =
        formatCurrency(totalIncome);

    document.getElementById("totalExpense").textContent =
        formatCurrency(totalExpense);

    document.getElementById("totalBalance").textContent =
        formatCurrency(totalBalance);


    // ==============================
    // Recent Income
    // ==============================

    displayRecentIncome(incomeData);


    // ==============================
    // Recent Expenses
    // ==============================

    displayRecentExpenses(expenseData);


    // ==============================
    // Monthly Summary
    // ==============================

    displayMonthlySummary(
        incomeData,
        expenseData
    );
}


// ==============================
// Recent Income
// ==============================

function displayRecentIncome(incomeData) {

    const container =
        document.getElementById("recentIncome");

    if (!container) return;


    if (incomeData.length === 0) {

        container.innerHTML =
            `<p class="empty-message">
                No income records found.
            </p>`;

        return;
    }


    const recentIncome =
        [...incomeData]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);


    container.innerHTML =
        recentIncome.map(function (item) {

            return `
                <div class="transaction-item">

                    <div>
                        <strong>${item.source}</strong>

                        <small>
                            ${formatDate(item.date)}
                        </small>
                    </div>

                    <span class="income-amount">
                        +${formatCurrency(item.amount)}
                    </span>

                </div>
            `;

        }).join("");
}


// ==============================
// Recent Expenses
// ==============================

function displayRecentExpenses(expenseData) {

    const container =
        document.getElementById("recentExpenses");

    if (!container) return;


    if (expenseData.length === 0) {

        container.innerHTML =
            `<p class="empty-message">
                No expense records found.
            </p>`;

        return;
    }


    const recentExpenses =
        [...expenseData]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);


    container.innerHTML =
        recentExpenses.map(function (item) {

            return `
                <div class="transaction-item">

                    <div>
                        <strong>${item.name}</strong>

                        <small>
                            ${formatDate(item.date)}
                        </small>
                    </div>

                    <span class="expense-amount">
                        -${formatCurrency(item.amount)}
                    </span>

                </div>
            `;

        }).join("");
}


// ==============================
// Monthly Summary
// ==============================

function displayMonthlySummary(
    incomeData,
    expenseData
) {

    const now = new Date();

    const currentMonth =
        now.getMonth();

    const currentYear =
        now.getFullYear();


    const monthlyIncome =
        incomeData.reduce(function (total, item) {

            const date =
                new Date(item.date);

            if (
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            ) {
                return total + Number(item.amount || 0);
            }

            return total;

        }, 0);


    const monthlyExpense =
        expenseData.reduce(function (total, item) {

            const date =
                new Date(item.date);

            if (
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            ) {
                return total + Number(item.amount || 0);
            }

            return total;

        }, 0);


    const monthlyBalance =
        monthlyIncome - monthlyExpense;


    document.getElementById("monthlyIncome").textContent =
        formatCurrency(monthlyIncome);

    document.getElementById("monthlyExpense").textContent =
        formatCurrency(monthlyExpense);

    document.getElementById("monthlyBalance").textContent =
        formatCurrency(monthlyBalance);
}


// ==============================
// Currency
// ==============================

function formatCurrency(amount) {

    return "₹" + Number(amount).toLocaleString("en-IN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}


// ==============================
// Date
// ==============================

function formatDate(date) {

    if (!date) return "";

    const d = new Date(date);

    if (isNaN(d.getTime())) {
        return date;
    }

    return d.toLocaleDateString("en-IN");
}