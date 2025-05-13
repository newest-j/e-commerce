import { homeNav, footer, productJson } from "./utils.js";

homeNav().then(data => {
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

footer().then(data => {
    document.getElementById("footer").innerHTML = data;
})


const guestData = JSON.parse(localStorage.getItem("guest")) || [];
const productCheckDiff = document.querySelector(".productcheckdiff");
const productCheckMain = document.querySelector(".productcheckmain");
const productPrice = document.querySelector(".productprice");
const productName = document.querySelector(".productname");
const productDescription = document.querySelector(".productdescription");
const productRating = document.querySelector(".productrate");
const productNumber = document.querySelector(".productnumber");
const product = guestData.checkproduct;


// to check product
function productcheck(row, item) {
    const checkProduct = row.querySelector(".checkproduct");
    checkProduct.addEventListener("click", () => {
        const data = {
            productName: item.title,
            productDescription: item.description,
            productPrice: item.price,
            productCategory: item.category,
            productImage: item.image,
            productRating: item.rating
        };

        const guestData = JSON.parse(localStorage.getItem("guest")) || { wishlist: [], cart: [], checkproduct: [] };

        // Set checkproduct to only this product
        guestData.checkproduct = data;

        localStorage.setItem("guest", JSON.stringify(guestData));
    });
}




const row = document.createElement('div');
row.innerHTML = `
<div id="productresponsive" class="d-flex flex-wrap gap-5 flex-column py-2 align-items-center">
    <img type="button" class="img-fluid" style="width: 120px; height: 100px; filter: grayscale(100%) sepia(100%) hue-rotate(30deg);" src="${product.productImage}" alt="">
    <img type="button" class="img-fluid" style="width: 120px; height: 100px; filter: grayscale(100%) sepia(100%) hue-rotate(90deg);" src="${product.productImage}" alt="">
    <img type="button" class="img-fluid" style="width: 120px; height: 100px; filter: grayscale(100%) sepia(100%) hue-rotate(180deg);" src="${product.productImage}" alt="">
    <img type="button" class="img-fluid" style="width: 120px; height: 100px; filter: grayscale(100%) sepia(100%) hue-rotate(270deg);" src="${product.productImage}" alt="">
</div>`;
productCheckDiff.appendChild(row);

productCheckMain.src = `${product.productImage}`;
productPrice.innerHTML = `$${product.productPrice}`;
productName.innerHTML = `${product.productName}`;
productDescription.innerHTML = `${product.productDescription}`;
productRating.innerHTML = `${product.productRating.rate} `;
productNumber.innerHTML = `(${product.productRating.count})`;

function wishlistAndCart(row, product) {
    const productBtn = row.querySelector(".button");
    const guestData = JSON.parse(localStorage.getItem("guest")) || { wishlist: [], cart: [], checkproduct: [] };
    const isWishlisted = guestData.wishlist.some(item => item.title === product.title);

    if (isWishlisted) {
        productBtn.src = "/images/red heart.png";
        productBtn.style.width = "32px";
        productBtn.style.height = "32px";
    }

    productBtn.addEventListener("click", () => {
        const isRed = productBtn.src.includes("/images/red%20heart.png") || productBtn.src.includes("/images/red heart.png");
        const wishlistItem = {
            title: product.title,
            price: product.price,
            image: product.image
        };

        const guestData = JSON.parse(localStorage.getItem("guest")) || { wishlist: [], cart: [], checkproduct: [] };

        if (isRed) {
            productBtn.src = "/images/Wishlist.png";
            guestData.wishlist = guestData.wishlist.filter(item => item.title !== product.title);
        } else {
            productBtn.src = "/images/red heart.png";
            guestData.wishlist.push(wishlistItem);
        }

        productBtn.style.width = "32px";
        productBtn.style.height = "32px";
        localStorage.setItem("guest", JSON.stringify(guestData));

        const notification = document.querySelector(".notification");
        const updatedWishlist = guestData.wishlist;

        if (updatedWishlist.length > 0) {
            notification.textContent = updatedWishlist.length;
            notification.style.display = "block";
        } else {
            notification.style.display = "none";
        }
    });

    const productCartBtn = row.querySelector(".cart");
    const isCart = guestData.cart.some(item => item.title === product.title);

    if (isCart) {
        productCartBtn.textContent = "Added to cart";
    }

    productCartBtn.addEventListener("click", () => {
        const isAdded = productCartBtn.textContent.includes("Added to cart");
        const cartItems = {
            title: product.title,
            price: product.price,
            image: product.image
        };

        const guestData = JSON.parse(localStorage.getItem("guest")) || { wishlist: [], cart: [], checkproduct: [] };

        if (isAdded) {
            productCartBtn.textContent = "Add To Cart";
            guestData.cart = guestData.cart.filter(item => item.title !== product.title);
        } else {
            productCartBtn.textContent = "Added to cart";
            guestData.cart.push(cartItems);
        }

        localStorage.setItem("guest", JSON.stringify(guestData));

        const cartNotification = document.querySelector(".cart-notification");
        const updatedCart = guestData.cart;

        if (updatedCart.length > 0) {
            cartNotification.textContent = updatedCart.length;
            cartNotification.style.display = "block";
        } else {
            cartNotification.style.display = "none";
        }
    });
}






productJson().then(data => {
    data.forEach(item => {
        if (product.productCategory === item.category) {
            let discount = (item.price * 50) / 100;
            const relatedProduct = document.querySelector(".relatedproduct");
            const row = document.createElement('div');
            row.className = 'col';
            row.innerHTML = `
                <div id="itembox" class="d-flex flex-column rounded-1 pt-3" style="height: 250px; background-color: #f5f5f5;">
                    <div class="d-flex justify-content-between px-2">
                        <p class="rounded-1 px-1 d-flex align-items-center text-white" style="height:30px; background-color:#DB4444">-50%</p>
                        <img style="width: 130px; height: 130px;" class="mt-4" src="${item.image}" alt="">
                        <div class="d-flex flex-column">
                            <img type="button" class="button" style="width: 32px; height: 32px;" src="/images/Wishlist.png" alt="wishlist">
                            <a class="checkproduct ms-1" href="/html/homeproduct.html"><img src="/images/Quick View.png" alt="quick view"></a>
                        </div>
                    </div>
                    <button class="cart redirect w-100 mt-auto btn btn-dark">Add To Cart</button>
                </div>
                <h3 style="font-size: 1rem;">${item.title}</h3>
                <span style="color: #DB4444; font-weight: bold;">$${(item.price - discount).toFixed(2)}</span>
                <span class="text-secondary text-decoration-line-through">$${item.price}</span>
                <div class="d-flex gap-2">
                    <div class="d-flex gap-1">
                        <span>${item.rating.rate}</span>
                        <img style="width: 20px; height: 20px;" src="/images/full star.png" alt="fullstar">
                    </div>
                    <span class="text-secondary">(${item.rating.count} available)</span>
                </div>`;

            relatedProduct.appendChild(row);
            wishlistAndCart(row, item);


            // to check the product
            productcheck(row, item)
        }
    });
});
