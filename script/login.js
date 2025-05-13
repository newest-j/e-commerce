import { signupLoginNav, footer, showAlert } from "./utils.js";

signupLoginNav().then(data => {
    document.getElementById("nav").innerHTML = data;

     // Wishlist notification setup
    const guestData = JSON.parse(localStorage.getItem("guest")) || [];
    const wishlistItems = guestData.wishlist || [];
    document.querySelectorAll(".notification").forEach(notification => {
        if (wishlistItems.length > 0) {
            notification.textContent = wishlistItems.length;
            notification.style.display = "block";
        } else {
            notification.style.display = "none";
        }
    });

    // Cart notification setup
    const cartItems = guestData.cart || [];
    document.querySelectorAll(".cart-notification").forEach(notification => {
        if (cartItems.length > 0) {
            notification.textContent = cartItems.length;
            notification.style.display = "block";
        } else {
            notification.style.display = "none";
        }
    });
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



