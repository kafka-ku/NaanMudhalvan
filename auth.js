// ==============================
// Authentication Protection
// ==============================

const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

// If user is not logged in
if (!loggedInUser) {
    window.location.href = "login.html";
}