import { homeNav, footer } from "./utils.js";

homeNav().then(data => {
    document.getElementById("nav").innerHTML = data;


    // Wishlist notification setup
    const guestData = JSON.parse(localStorage.getItem("guest")) || { wishlist: [], cart: [], checkproduct: [] };



    const wishlistItems = guestData.wishlist;
    document.querySelectorAll(".notification").forEach(notification => {
        if (wishlistItems.length > 0) {
            notification.textContent = wishlistItems.length;
            notification.style.display = "block";
        } else {
            notification.style.display = "none";
        }
    })



    // Cart notification setup
    const cartItems = guestData.cart || [];

    document.querySelectorAll(".cart-notification").forEach(cartNotification => {
        if (cartItems.length > 0) {
            cartNotification.textContent = cartItems.length;
            cartNotification.style.display = "block";
        } else {
            cartNotification.style.display = "none";
        }
    })
})


footer().then(data => {
    document.getElementById("footer").innerHTML = data;
})



const guestData = JSON.parse(localStorage.getItem("guest")) || { wishlist: [], cart: [], checkproduct: [] };
const guestCart = guestData.cart;
const checkOut = document.querySelector(".checkout");

// Render cart items
guestCart.forEach(item => {
    const row = document.createElement("div");
    row.className = "d-flex justify-content-between";
    row.innerHTML = `
        <div>
            <img style="width: 40px; height: 40px;" src="${item.image}" alt="">
            <span>${item.title}</span>
        </div>
        <p>$${item.price}</p>
    `;
    checkOut.appendChild(row);
});

// Calculate subtotal
let subtotal = 0;
guestCart.forEach(item => {
    subtotal += item.price;
});

// Update subtotal and total
document.querySelectorAll(".checkout-total").forEach(el => {
    el.textContent = `$${subtotal.toFixed(2)}`;
});
