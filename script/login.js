import { signupLoginNav, footer, showAlert } from "./utils.js";

signupLoginNav().then(data => {
    document.getElementById("nav").innerHTML = data;
});

footer().then(data => {
    document.getElementById("footer").innerHTML = data;
});

// Elements
const loginBtn = document.querySelector(".loginbtn");
const emailOrNumber = document.getElementById("emailandnum");
const password = document.getElementById("password");

// Regex for email/number and password validation
const emailNumberRegex = /^((\+?[0-9\s\-().]{7,})|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}))$/;

// Input validations 
emailOrNumber.addEventListener("input", () => {
    const value = emailOrNumber.value.trim();
    const message = document.getElementById("erroremailandnumber");

    if (value === "") {
        message.innerHTML = "";
    } else if (!emailNumberRegex.test(value)) {
        message.innerHTML = "Invalid ❌";
        message.style.color = "red";
    } else {
        message.innerHTML = "Valid ✅";
        message.style.color = "green";
    }
});

// Login click handler
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const enteredEmailOrNum = emailOrNumber.value.trim();
    const enteredPassword = password.value.trim();

    if (!enteredEmailOrNum || !enteredPassword) {
        showAlert({
            title: "Missing",
            text: "Please enter both email/number and password",
            icon: "warning"
        });
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    const matchedUser = users.find(user =>
        user.email === enteredEmailOrNum && user.password === enteredPassword
    );

    if (!matchedUser) {
        showAlert({
            icon: "error",
            title: "Invalid Login",
            text: "Incorrect email/number or password"
        });
        return;
    }

    // Login success – set current user
    localStorage.setItem("currentuserid", JSON.stringify(matchedUser.id));

    showAlert({
        icon: "success",
        text: "Login successful ✅"
    });

    setTimeout(() => {
        window.location.href = "/html/user.html";
    }, 1500);
});



