import { homeNav, footer, productJson } from "./utils.js";

homeNav().then(data => {
    document.getElementById("nav").innerHTML = data;

    // Wishlist notification setup
    const guestData = JSON.parse(localStorage.getItem("guest")) || [];
    const wishlistItems = guestData.wishlist;
    const notification = document.querySelector(".notification");

    if (wishlistItems.length > 0) {
        notification.textContent = wishlistItems.length;
        notification.style.display = "block";
    } else {
        notification.style.display = "none";
    }

    // Cart notification setup
    const cartNotification = document.querySelector(".cart-notification");
    const cartItems = guestData.cart || [];

    if (cartItems.length > 0) {
        cartNotification.textContent = cartItems.length;
        cartNotification.style.display = "block";
    } else {
        cartNotification.style.display = "none";
    }
})


footer().then(data => {
    document.getElementById("footer").innerHTML = data;
})

const guestData = JSON.parse(localStorage.getItem("guest")) || { wishlist: [], cart: [], checkproduct: [] };
const cart = guestData.cart;

cart.forEach(product => {
    const row = document.createElement('div');
    const cartRow = document.querySelector(".cart");

    row.innerHTML = `
        <div id="cartrow" class="row align-items-center mt-3">
            <div class="col-4 d-flex flex-wrap align-items-center">
                <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px;" class="me-2">
                <span>${product.title}</span>
            </div>
            <div class="col-2 text-center">${product.price}</div>
            <div class="col-3 text-center">
                <input type="number" class="input form-control" value="1" style="max-width: 80px; margin: auto;">
            </div>
            <div class="price col-3 text-end">${product.price}</div>
        </div>
    `;

    cartRow.appendChild(row);

    // Select the input and price element *within this row* only
    const quantityInput = row.querySelector(".input");
    const priceField = row.querySelector(".price");

    quantityInput.addEventListener("input", () => {
        const quantity = parseInt(quantityInput.value) || 0;
        const subTotal = (product.price * quantity).toFixed(2);
        priceField.innerText = subTotal;

    });
});





