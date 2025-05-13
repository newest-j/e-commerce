import { userNav, footer, productJson, signout } from "./utils.js";
// Load navigation
userNav().then(data => {
    document.getElementById("nav").innerHTML = data;
    signout();
    // Wishlist notification 
    const users = JSON.parse(localStorage.getItem("users"));
    const currentUserId = JSON.parse(localStorage.getItem("currentuserid"));
    const user = users.find(currentuser => currentuser.id === currentUserId);

    const wishlistItems = user.wishlist;
    const notification = document.querySelector(".notification");

    if (wishlistItems.length > 0) {
        notification.textContent = wishlistItems.length;
        notification.style.display = "block";
    } else {
        notification.style.display = "none";
    }

    // Cart notification
    const cartNotification = document.querySelector(".cart-notification");
    const cartItems = user.cart;

    if (cartItems.length > 0) {
        cartNotification.textContent = cartItems.length;
        cartNotification.style.display = "block";
    } else {
        cartNotification.style.display = "none";
    }
});

// Load footer
footer().then(data => {
    document.getElementById("footer").innerHTML = data;
});

// Wishlist total setup
const userwishlist = document.querySelector(".wishlist");

const users = JSON.parse(localStorage.getItem("users"));
const currentUserId = JSON.parse(localStorage.getItem("currentuserid"));
const user = users.find(currentuser => currentuser.id === currentUserId);

const wishlistItems = user.wishlist;

// just for you
const justForYouBtn = document.querySelector(".seeall");
const justForYou = document.querySelector(".justforyou");
let expand = false;

const whishlistTotal = document.querySelector("#whishlistotal");
whishlistTotal.innerHTML = `(${wishlistItems.length})`;

productJson().then(data => {
    ForYou(data.slice(40, 44));

    justForYouBtn.addEventListener("click", () => {
        justForYou.innerHTML = "";
        if (!expand) {
            ForYou(data.slice(40));
            justForYouBtn.innerHTML = "Hide";
            expand = true;
        } else {
            ForYou(data.slice(40, 44));
            justForYouBtn.innerHTML = "See All";
            expand = false;
        }
    });
});

// Update cart notification
function updateCartNotification() {
    const users = JSON.parse(localStorage.getItem("users"));
    const currentUserId = JSON.parse(localStorage.getItem("currentuserid"));
    const user = users.find(currentuser => currentuser.id === currentUserId);

    const cartNotification = document.querySelector(".cart-notification");
    const updatedCart = user.cart;

    if (updatedCart.length > 0) {
        cartNotification.textContent = updatedCart.length;
        cartNotification.style.display = "block";
    } else {
        cartNotification.style.display = "none";
    }
}

// to check product
function productcheck(row, product) {
    const checkProduct = row.querySelector(".checkproduct");
    checkProduct.addEventListener("click", () => {
        const data = {
            productName: product.title,
            productDescription: product.description,
            productPrice: product.price,
            productCategory: product.category,
            productImage: product.image,
            productRating: product.rating
        };

        const users = JSON.parse(localStorage.getItem("users"));
        const currentUserId = JSON.parse(localStorage.getItem("currentuserid"));
        const user = users.find(currentuser => currentuser.id === currentUserId);

        // Set checkproduct to only this product
        user.checkproduct = data;

        localStorage.setItem("users", JSON.stringify(users));
    });
}

//  Just For You section
function ForYou(productForYou) {
    const users = JSON.parse(localStorage.getItem("users"));
    const currentUserId = JSON.parse(localStorage.getItem("currentuserid"));
    const user = users.find(currentuser => currentuser.id === currentUserId);

    productForYou.forEach(product => {
        const row = document.createElement('div');
        row.className = "col";
        row.innerHTML = `
            <div id="itembox" class="d-flex flex-column rounded-1 pt-3" style="height: 250px; background-color: #f5f5f5;">
                <div class="d-flex justify-content-between px-2">
                    <p class="rounded-1 ps-2"></p>
                    <img style="width: 150px; height: 150px;" class="mt-4" src="${product.image}" alt="${product.title}">
                    <div class="d-flex flex-column">
                        <a class="checkproduct ms-1" href="/html/product.html"><img src="/images/Quick View.png" alt="quick view"></a>
                    </div>
                </div>
                <button class="cart redirect w-100 mt-auto btn btn-dark">Add To Cart</button>
            </div>
            <h3>${product.title}</h3>
            <div class="d-flex gap-2">
                <span style="color: #DB4444;">$${product.price.toFixed(2)}</span>
                <div class="d-flex gap-0">
                    <span>${product.rating.rate}</span>
                    <img src="/images/full star.png" alt="fullstar">
                </div>
                <span class="text-secondary">(${product.rating.count} available)</span>
            </div>
        `;
        justForYou.appendChild(row);

        productcheck(row, product);

        const wishlistCartBtn = row.querySelector(".cart");

        const isCart = user.cart.some(item => item.title === product.title);
        if (isCart) {
            wishlistCartBtn.textContent = "Added to cart";
        }

        wishlistCartBtn.addEventListener("click", () => {
            const cartItem = {
                title: product.title,
                price: product.price,
                image: product.image
            };

            if (wishlistCartBtn.textContent.includes("Added to cart")) {
                wishlistCartBtn.textContent = "Add To Cart";
                user.cart = user.cart.filter(item => item.title !== product.title);
            } else {
                wishlistCartBtn.textContent = "Added to cart";
                user.cart.push(cartItem);
            }

            localStorage.setItem("users", JSON.stringify(users));
            updateCartNotification();
        });
    });
}

// wishlist
wishlistItems.forEach(wishlist => {
    const row = document.createElement('div');
    row.className = "col";
    row.innerHTML = `
        <div id="itembox" class="d-flex flex-column rounded-1 pt-3" style="height: 250px; background-color: #f5f5f5;">
            <div class="d-flex justify-content-between px-2">
                <p class="text-white rounded-1 ps-2"></p>
                <img style="width: 130px; height: 130px;" class="mt-4" src="${wishlist.image}" alt="">
                <div class="d-flex flex-column">
                    <a href="#"><img src="/images/icon-delete.png" alt="wishlist"></a>
                </div>
            </div>
            <button class="cart w-100 mt-auto btn btn-dark">Add To Cart</button>
        </div>
        <h3>${wishlist.title}</h3>
        <span style="color: #DB4444;">$${wishlist.price}</span>
    `;
    userwishlist.appendChild(row);

    const wishlistCartBtn = row.querySelector(".cart");

    const isCart = user.cart.some(item => item.title === wishlist.title);
    if (isCart) {
        wishlistCartBtn.textContent = "Added to cart";
    }

    wishlistCartBtn.addEventListener("click", () => {
        const cartItem = {
            title: wishlist.title,
            price: wishlist.price,
            image: wishlist.image
        };

        if (wishlistCartBtn.textContent.includes("Added to cart")) {
            wishlistCartBtn.textContent = "Add To Cart";
            user.cart = user.cart.filter(item => item.title !== wishlist.title);
        } else {
            wishlistCartBtn.textContent = "Added to cart";
            user.cart.push(cartItem);
        }

        localStorage.setItem("users", JSON.stringify(users));
        updateCartNotification();
    });
});
