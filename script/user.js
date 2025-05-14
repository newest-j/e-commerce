import { userNav, footer, productJson, signout } from "./utils.js";


// Load footer and navbar into the HTML
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

    // thye filter by search
    const searchInputs = document.querySelectorAll(".search");

    searchInputs.forEach((input) => {
        input.addEventListener("input", () => {
            const keyword = input.value.trim().toLowerCase();
            const target = document.getElementById("exploreproduct");

            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            if (keyword === "") {
                // If input is cleared, reset to full list or initial view
                displayProducts(allProducts.slice(0, exploreExpanded ? allProducts.length : productsPerPage));
                return;
            }

            const filteredProducts = allProducts.filter(product =>
                product.title.toLowerCase().includes(keyword) ||
                product.category.toLowerCase().includes(keyword) ||
                product.description.toLowerCase().includes(keyword)
            );

            displayProducts(filteredProducts, true);
        });
    });






})


footer().then(data => {
    document.getElementById("footer").innerHTML = data;
})

const users = JSON.parse(localStorage.getItem("users"));
const currentUserId = JSON.parse(localStorage.getItem("currentuserid"));
const user = users.find(currentuser => currentuser.id === currentUserId)


// DOM Elements for each section
const exploreProduct = document.getElementById('exploreproduct');
const exploreProductBtn = document.getElementById("exploreproductbtn");
const exploreBtnText = document.getElementById("explorebtn");

const sellingProduct = document.getElementById("sellingproduct");
const sellProductBtn = document.getElementById("sellingproductbtn");
const sellingBtnText = document.getElementById("sellingproducttext");

const flashSale = document.getElementById("flashsale");
const flashSaleBtn = document.getElementById("flashbtn");
const flashSaleText = document.getElementById("flashbtntext");


// Store all products here
let allProducts = [];

// the category
document.querySelectorAll(".scroll").forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");
        const filtered = allProducts.filter(product => product.category === category);
        displayProducts(filtered, true);
    });
});






// Explore Products
let exploreExpanded = false;
let explorePage = 0;
const productsPerPage = 4;

// Best Selling and Flash Sale
let sellExpanded = false;
let flashExpanded = false;
let currentPage = 0;

// Fetch products and initialize display
productJson().then(data => {
    allProducts = data;

    // Initial display for all sections
    displayProducts(allProducts.slice(0, 17));
    sellingProducts(allProducts.slice(17, 21));
    flashSales(allProducts.slice(34));



    // Toggle explore product section
    exploreProductBtn.addEventListener('click', () => {
        explorePage = 0;
        if (!exploreExpanded) {
            displayProducts(allProducts, true);
            exploreBtnText.innerHTML = "Hide Products";
            exploreExpanded = true;
        } else {
            displayProducts(allProducts, false);
            exploreBtnText.innerHTML = "View All Products";
            exploreExpanded = false;
            exploreProduct.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });

    // Toggle best selling section
    sellProductBtn.addEventListener('click', () => {
        sellingProduct.innerHTML = '';
        if (!sellExpanded) {
            sellingProducts(allProducts.slice(17, 34));
            sellingBtnText.innerHTML = "Hide Products";
            sellExpanded = true;
        } else {
            sellingProducts(allProducts.slice(17, 21));
            sellingBtnText.innerHTML = "View all ";
            sellExpanded = false;
        }
    });

    // Toggle flash sale section
    flashSaleBtn.addEventListener('click', () => {
        flashSale.innerHTML = '';
        if (!flashExpanded) {
            flashSales(allProducts.slice(34), true);
            flashSaleText.innerHTML = "Hide Products";
            flashExpanded = true;
        } else {
            currentPage = 0;
            flashSales(allProducts.slice(34));
            flashSaleText.innerHTML = "View all";
            flashExpanded = false;
            flashSale.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

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
        const user = users.find(currentuser => currentuser.id === currentUserId)

        // Set checkproduct to only this product
        user.checkproduct = data;

        localStorage.setItem("users", JSON.stringify(users));
    });
}


// Wishlist and Cart functionality
function wishlistAndCart(row, product) {
    // Wishlist functionality
    const productBtn = row.querySelector(".button");
    const users = JSON.parse(localStorage.getItem("users"));
    const currentUserId = JSON.parse(localStorage.getItem("currentuserid"));
    const user = users.find(currentuser => currentuser.id === currentUserId)

    const isWishlisted = user.wishlist.some(item => item.title === product.title);

    if (isWishlisted) {
        productBtn.src = "/images/red heart.png";
        productBtn.style.width = "32px";
        productBtn.style.height = "32px";
    }

    productBtn.addEventListener("click", () => {
        const isRed = productBtn.src.includes("/images/red%20heart.png");
        const wishlistItem = {
            title: product.title,
            price: product.price,
            image: product.image
        };

        const users = JSON.parse(localStorage.getItem("users"));
        const currentUserId = JSON.parse(localStorage.getItem("currentuserid"));
        const user = users.find(currentuser => currentuser.id === currentUserId)

        if (isRed) {
            productBtn.src = "/images/Wishlist.png";
            user.wishlist = user.wishlist.filter(item => item.title !== product.title);
        } else {
            productBtn.src = "/images/red heart.png";
            user.wishlist.push(wishlistItem);
        }

        productBtn.style.width = "32px";
        productBtn.style.height = "32px";
        localStorage.setItem("users", JSON.stringify(users));

        const notification = document.querySelector(".notification");
        const updatedWishlist = user.wishlist;

        if (updatedWishlist.length > 0) {
            notification.textContent = updatedWishlist.length;
            notification.style.display = "block";
        } else {
            notification.style.display = "none";
        }
    });

    // Cart functionality
    const productCartBtn = row.querySelector(".cart");
    const isCart = user.cart.some(item => item.title === product.title);

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



        const users = JSON.parse(localStorage.getItem("users"));
        const currentUserId = JSON.parse(localStorage.getItem("currentuserid"));
        const user = users.find(currentuser => currentuser.id === currentUserId)

        if (isAdded) {
            productCartBtn.textContent = "Add To Cart";
            user.cart = user.cart.filter(item => item.title !== product.title);
        } else {
            productCartBtn.textContent = "Added to cart";
            user.cart.push(cartItems);
        }
        localStorage.setItem("users", JSON.stringify(users));


        const cartNotification = document.querySelector(".cart-notification");
        const updatedCart = user.cart;

        if (updatedCart.length > 0) {
            cartNotification.textContent = updatedCart.length;
            cartNotification.style.display = "block";
        } else {
            cartNotification.style.display = "none";
        }
    });
}

// Function to display explore products
function displayProducts(products, showAll = false) {
    exploreProduct.innerHTML = "";
    const start = explorePage * productsPerPage;
    const end = showAll ? products.length : start + productsPerPage;
    const itemsToDisplay = products.slice(start, end);

    itemsToDisplay.forEach(product => {
        const row = document.createElement('div');
        row.className = "col";
        row.innerHTML = `
            <div id="itembox" class="d-flex flex-column rounded-1 pt-3" style="height: 250px; background-color: #f5f5f5;">
                <div class="d-flex justify-content-between px-2">
                    <p class="rounded-1 ps-2"></p>
                    <img style="width: 150px; height: 150px;" class="mt-4" src="${product.image}" alt="${product.title}">
                    <div class="d-flex flex-column">
                        <img class="button" src="/images/Wishlist.png" alt="wishlist">
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
        exploreProduct.appendChild(row);

        // Call wishlist and cart
        wishlistAndCart(row, product);

        // to check the product
        productcheck(row, product);


    });
}

// Pagination buttons for explore section
document.querySelector(".explore-left-btn").addEventListener("click", () => {
    if (explorePage > 0) {
        explorePage--;
        displayProducts(allProducts, exploreExpanded);
    }
});

document.querySelector(".explore-right-btn").addEventListener("click", () => {
    const totalPages = Math.ceil(allProducts.length / productsPerPage);
    if ((explorePage + 1) < totalPages) {
        explorePage++;
        displayProducts(allProducts, exploreExpanded);
    }
});

// // Display best selling products
function sellingProducts(products) {
    sellingProduct.innerHTML = "";
    products.forEach(product => {
        let discount = (product.price * 50) / 100;
        const row = document.createElement('div');
        row.className = "col";
        row.innerHTML = `
            <div id="itembox" class="d-flex flex-column rounded-1 pt-3" style="height: 250px; background-color: #f5f5f5;">
                <div class="d-flex justify-content-between px-2">
                    <p class="rounded-1 ps-2"></p>
                    <img style="width: 130px; height: 130px;" class="mt-4" src="${product.image}" alt="">
                    <div class="d-flex flex-column">
                        <img class="button" src="/images/Wishlist.png" alt="wishlist">
                        <a class="checkproduct ms-1" href="/html/product.html"><img src="/images/Quick View.png" alt=""></a>
                    </div>
                </div>
                <button class="cart redirect w-100 mt-auto btn btn-dark">Add To Cart</button>
            </div>
            <h3>${product.title}</h3>
            <span style="color: #DB4444;">$${discount.toFixed(2)}</span>
            <span class="text-secondary text-decoration-line-through">$${product.price}</span>
            <div class="d-flex gap-2">
                <div class="d-flex gap-0">
                    <span>${product.rating.rate}</span>
                    <img src="/images/full star.png" alt="fullstar">
                </div>
                <span class="text-secondary">(${product.rating.count} available)</span>
            </div>
        `;
        sellingProduct.appendChild(row);

        // Call wishlist and cart
        wishlistAndCart(row, product);

        // to check the product
        productcheck(row, product)

    });
}

// // Display flash sale products
function flashSales(products, showAll = false) {
    flashSale.innerHTML = "";
    const itemsToDisplay = showAll ? products : products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);

    itemsToDisplay.forEach(product => {
        let discount = (product.price * 50) / 100;
        const row = document.createElement('div');
        row.className = "col";
        row.innerHTML = `
            <div id="itembox" class="d-flex flex-column rounded-1 pt-3" style="height: 250px; background-color: #f5f5f5;">
                <div class="d-flex justify-content-between px-2">
                    <p class="rounded-1 px-1 d-flex align-items-center text-white" style="height:30px; background-color:#DB4444">-50%</p>
                    <img style="width: 130px; height: 130px;" class="mt-4" src="${product.image}" alt="">
                    <div class="d-flex flex-column">
                        <img type="button" class="button" src="/images/Wishlist.png" alt="wishlist">
                        <a class="checkproduct ms-1" href="/html/product.html"><img src="/images/Quick View.png" alt="quick view"></a>
                    </div>
                </div>
                <button class="cart redirect w-100 mt-auto btn btn-dark">Add To Cart</button>
            </div>
            <h3>${product.title}</h3>
            <span style="color: #DB4444;">$${discount.toFixed(2)}</span>
            <span class="text-secondary text-decoration-line-through">$${product.price}</span>
            <div class="d-flex gap-2">
                <div class="d-flex gap-0">
                    <span>${product.rating.rate}</span>
                    <img src="/images/full star.png" alt="fullstar">
                </div>
                <span class="text-secondary">(${product.rating.count} available)</span>
            </div>
        `;
        flashSale.appendChild(row);

        // Call wishlist and cart
        wishlistAndCart(row, product);

        // to check the product
        productcheck(row, product)

    });
}

// // Flash Sale pagination
document.querySelector(".flash-left-btn").addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        flashSales(allProducts.slice(34));
    }
});

document.querySelector(".flash-right-btn").addEventListener("click", () => {
    if ((currentPage + 1) * productsPerPage < allProducts.slice(34).length) {
        currentPage++;
        flashSales(allProducts.slice(34));
    }
});