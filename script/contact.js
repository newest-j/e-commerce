import { userNav, footer, signout } from "./utils.js";

userNav().then(data=>{
    document.getElementById("nav").innerHTML = data;
    signout();
})


footer().then(data=>{
    document.getElementById("footer").innerHTML = data;
})
