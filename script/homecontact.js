import { footer , homeNav } from "./utils.js";

footer().then(data=>{
    document.getElementById("footer").innerHTML = data;
})


homeNav().then(data=>{
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
})