// ==============================
// Register Module
// ==============================

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("registerMessage");

    // Check password
    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        message.style.color = "#dc2626";
        return;
    }

    // Password length
    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        message.style.color = "#dc2626";
        return;
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Check existing email
    const existingUser = users.find(function (user) {
        return user.email.toLowerCase() === email.toLowerCase();
    });

    if (existingUser) {
        message.textContent = "Email already registered.";
        message.style.color = "#dc2626";
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        fullName: fullName,
        email: email,
        password: password
    };

    // Save user
    users.push(newUser);

    localStorage.setItem("registeredUsers", JSON.stringify(users));

    // Success message
    message.textContent = "Account created successfully!";
    message.style.color = "#23507c";

    // Clear form
    registerForm.reset();

    // Go to login page
    setTimeout(function () {
        window.location.href = "login.html";
    }, 1200);

});