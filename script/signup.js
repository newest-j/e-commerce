import { signupLoginNav, footer, showAlert } from "./utils.js";

signupLoginNav().then(data => {
    document.getElementById("nav").innerHTML = data;
})

footer().then(data => {
    document.getElementById("footer").innerHTML = data;
})


// Element for the form
const createAccount = document.querySelector('.createaccount')



// validation for the form

// email
const emailNumberRegex = /^((\+?[0-9\s\-().]{7,})|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/;

const emailNumber = document.getElementById("emailandnum");
const message = document.getElementById("erroremailandnumber");

const password = document.getElementById("password");
const message2 = document.getElementById("errorpassword");

const userName = document.getElementById("name");
const message3 = document.getElementById("errorname");

// email
emailNumber.addEventListener("input", () => {
    const value = emailNumber.value.trim();


    if (value === "") {
        message.innerHTML = "";
    }
    else if (!emailNumberRegex.test(value)) {
        message.innerHTML = "Invalid ❌";
        message.style.color = "red";
    } else {
        message.innerHTML = "Valid ✅";
        message.style.color = "green";
    }
});

// password
password.addEventListener("input", () => {
    const value = password.value.trim();

    if (value === "") {
        message2.innerHTML = "";
    }
    else if (!passwordRegex.test(value)) {
        message2.innerHTML = "Invalid ❌ At least 8 char, one letter, one digit,one special char(#!?)";
        message2.style.color = "red";
    } else {
        message2.innerHTML = "Valid ✅";
        message2.style.color = "green";
    }


})

//name
userName.addEventListener("input", () => {
    const value = userName.value.trim();

    if (value === "") {
        message3.innerHTML = "";
    }
    else if (!nameRegex.test(value)) {
        message3.innerHTML = "Invalid ❌ At least 2 char Spaces  Hyphens  and Apostrophes allowed";
        message3.style.color = "red";
    } else {
        message3.innerHTML = "Valid ✅";
        message3.style.color = "green";
    }


})





createAccount.addEventListener('click', (e) => {
    e.preventDefault();

    const nameValue = userName.value.trim();
    const emailAndNum = emailNumber.value.trim();
    const passwordValue = password.value.trim();
    const currentUserId = crypto.randomUUID();

    if (!nameValue || !emailAndNum || !passwordValue) {
        showAlert({
            title: 'Missing',
            text: 'Please fill in all required fields',
            icon: 'warning'
        });
        return;
    }

    // Get guest data if it exists
    const guestData = JSON.parse(localStorage.getItem("guest"));

    // Create user data object
    const userData = {
        id:currentUserId,
        userName: nameValue,
        email: emailAndNum,
        password: passwordValue,
        cart: [],
        wishlist: [],
        checkproduct: []
    };


    

    // Transfer guest data if available and not empty
    if (guestData && (guestData.cart.length > 0 || guestData.wishlist.length > 0 || guestData.checkproduct.length > 0)) {
        userData.cart = guestData.cart;
        userData.wishlist = guestData.wishlist;
        userData.checkproduct = guestData.checkproduct;
    }

    // Save the user data to "users" array
    let existingData = JSON.parse(localStorage.getItem("users")) || [];

    // check if email already exists
    const userExists = existingData.find(user => user.email === emailAndNum);
    if (userExists) {
        showAlert({
            icon: 'error',
            title: 'User Exists',
            text: 'A user with this email/number already exists.'
        });
        return;
    }

    existingData.push(userData);
    localStorage.setItem("users", JSON.stringify(existingData));

    localStorage.setItem("currentuserid", JSON.stringify(currentUserId));


    // Remove guest data
    localStorage.removeItem("guest");

    showAlert({
        icon: 'success',
        text: 'Signup successful ✅',
    });

    setTimeout(() => {
        window.location.href = "/html/user.html";
    }, 1500);
});
