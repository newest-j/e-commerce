import { userNav, footer, signout } from "./utils.js";

userNav().then(data => {
    document.getElementById("nav").innerHTML = data;
    signout();

    // Wishlist notification setup
    const users = JSON.parse(localStorage.getItem("users"));
    const currentUserId = JSON.parse(localStorage.getItem("currentuserid"));
    const user = users.find(currentuser => currentuser.id === currentUserId);


    const wishlistItems = user.wishlist;
    document.querySelectorAll(".notification").forEach(notification => {
        if (wishlistItems.length > 0) {
            notification.textContent = wishlistItems.length;
            notification.style.display = "block";
        } else {
            notification.style.display = "none";
        }
    })



    // Cart notification setup
    const cartItems = user.cart || [];

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
