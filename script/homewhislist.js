import { homeNav, footer, productJson } from "./utils.js";

// notification wishlistandcart
function updateWishlistcartNotification() {
    const guestData = JSON.parse(localStorage.getItem("guest")) || { wishlist: [], cart: [], checkproduct: [] };
    const wishlistItems = guestData.wishlist || [];

    document.querySelectorAll(".notification").forEach(notification => {

        notification.textContent = wishlistItems.length;
        notification.style.display = wishlistItems.length > 0 ? "block" : "none";
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


}


homeNav().then(data => {
    document.getElementById("nav").innerHTML = data;

    updateWishlistcartNotification()

});

footer().then(data => {
    document.getElementById("footer").innerHTML = data;
});

const userwishlist = document.querySelector(".wishlist");
const guestData = JSON.parse(localStorage.getItem("guest")) || { wishlist: [], cart: [], checkproduct: [] };
const wishlistItems = guestData.wishlist || [];

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
            justForYouBtn.innerHTML = "Hide"
            expand = true;
        }
        else {
            ForYou(data.slice(40, 44))
            justForYouBtn.innerHTML = "See All"
        }
    })

});

function updateCartNotification() {
    const guestData = JSON.parse(localStorage.getItem("guest")) || { cart: [] };
    document.querySelectorAll(".cart-notification").forEach(cartNotification => {
        const updatedCart = guestData.cart;
        cartNotification.textContent = updatedCart.length;
        cartNotification.style.display = updatedCart.length > 0 ? "block" : "none";
    });

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

        const guestData = JSON.parse(localStorage.getItem("guest")) || { wishlist: [], cart: [], checkproduct: [] };

        // Set checkproduct to only this product
        guestData.checkproduct = data;

        localStorage.setItem("guest", JSON.stringify(guestData));
    });
}




function ForYou(productForYou) {
    productForYou.forEach(product => {
        const row = document.createElement('div');
        row.className = "col";
        row.innerHTML = `
            <div id="itembox" class="d-flex flex-column rounded-1 pt-3" style="height: 250px; background-color: #f5f5f5;">
                <div class="d-flex justify-content-between px-2">
                    <p class="rounded-1 ps-2"></p>
                    <img style="width: 150px; height: 150px;" class="mt-4" src="${product.image}" alt="${product.title}">
                    <div class="d-flex flex-column">
                        <a class="checkproduct ms-1" href="/html/homeproduct.html"><img src="/images/Quick View.png" alt="quick view"></a>
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

        productcheck(row, product)

        const wishlistCartBtn = row.querySelector(".cart");

        const isCart = guestData.cart.some(item => item.title === product.title);
        if (isCart) {
            wishlistCartBtn.textContent = "Added to cart";
        }

        wishlistCartBtn.addEventListener("click", () => {
            const isAdded = wishlistCartBtn.textContent.includes("Added to cart");

            const cartItem = {
                title: product.title,
                price: product.price,
                image: product.image
            };

            const guestData = JSON.parse(localStorage.getItem("guest")) || { wishlist: [], cart: [] };

            if (isAdded) {
                wishlistCartBtn.textContent = "Add To Cart";
                guestData.cart = guestData.cart.filter(item => item.title !== product.title);
            } else {
                wishlistCartBtn.textContent = "Added to cart";
                guestData.cart.push(cartItem);
            }

            localStorage.setItem("guest", JSON.stringify(guestData));
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
                    <img class="delete" src="/images/icon-delete.png" alt="wishlist">
                </div>
            </div>
            <button class="cart w-100 mt-auto btn btn-dark">Add To Cart</button>
        </div>
        <h3>${wishlist.title}</h3>
        <span style="color: #DB4444;">$${wishlist.price}</span>
    `;
    userwishlist.appendChild(row);


    //delete
    const wishlistDelete = row.querySelector(".delete");
    const iswishlist = guestData.wishlist.some(item => item.title === wishlist.title);

    wishlistDelete.addEventListener("click", () => {
        if (iswishlist) {
            guestData.wishlist = guestData.wishlist.filter(product => product.title !== wishlist.title);
            localStorage.setItem("guest", JSON.stringify(guestData));
            row.remove();
            updateWishlistcartNotification()

        }
    });

    const wishlistCartBtn = row.querySelector(".cart");

    const isCart = guestData.cart.some(item => item.title === wishlist.title);
    if (isCart) {
        wishlistCartBtn.textContent = "Added to cart";
    }

    wishlistCartBtn.addEventListener("click", () => {
        const isAdded = wishlistCartBtn.textContent.includes("Added to cart");

        const cartItem = {
            title: wishlist.title,
            price: wishlist.price,
            image: wishlist.image
        };

        const guestData = JSON.parse(localStorage.getItem("guest")) || { wishlist: [], cart: [] };

        if (isAdded) {
            wishlistCartBtn.textContent = "Add To Cart";
            guestData.cart = guestData.cart.filter(item => item.title !== wishlist.title);
        } else {
            wishlistCartBtn.textContent = "Added to cart";
            guestData.cart.push(cartItem);
        }

        localStorage.setItem("guest", JSON.stringify(guestData));
        updateCartNotification();
    });
});
