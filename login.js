// ==============================
// Login Module
// ==============================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    // Get registered users
    const users = JSON.parse(
        localStorage.getItem("registeredUsers")
    ) || [];

    // Find user
    const user = users.find(function (account) {
        return account.email.toLowerCase() === email.toLowerCase()
            && account.password === password;
    });

    // Login failed
    if (!user) {
        message.textContent = "Invalid email or password.";
        message.style.color = "#dc2626";
        return;
    }

    // Save logged-in user
    const loggedInUser = {
        id: user.id,
        fullName: user.fullName,
        email: user.email
    };

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(loggedInUser)
    );

    // Success message
    message.textContent = "Login successful!";
    message.style.color = "#16a34a";

    // Redirect to Dashboard
    setTimeout(function () {
        window.location.href = "dashboard.html";
    }, 1000);

});