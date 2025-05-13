export const footer = async () => {
    const response = await fetch('/html/footer.html')
    const data = await response.text();

    return data;
}

export const signupLoginNav = async () => {
    const response = await fetch('/html/signuploginnav.html')
    const data = await response.text();

    return data;
}


export const userNav = async () => {
    const response = await fetch('/html/usernav.html')
    const data = await response.text();

    return data;
}


export const homeNav = async () => {
    const response = await fetch('/html/homenav.html')
    const data = await response.text();

    return data;
}

export const productJson = async () => {
    const response = await fetch('/data/data.json')
    const data = await response.json()

    return data;
}

export function showAlert({ title = '', text = '', icon = 'info', confirmButtonText = 'OK', position = 'top-end',
    timer = 4000,
    showConfirmButton = true
}) {
    Swal.fire({
        icon,
        title,
        text,
        confirmButtonText,
        toast: true,
        position,
        timer,
        showConfirmButton,
        timerProgressBar: true

    });
}

export const guestUser = () => {
    if (!JSON.parse(localStorage.getItem("guest"))) {
        const data = {
            cart: [],
            wishlist: [],
            checkproduct: []
        };

        localStorage.setItem("guest", JSON.stringify(data));
    }

};

export const signout = () => {
    document.querySelectorAll(".signout").forEach(user => {
        user.addEventListener("click", () => {
            localStorage.removeItem("currentuserid");

            window.location.href = "/index.html";
        });
    })

};
