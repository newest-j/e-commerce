import { userNav, footer } from "./utils.js";

userNav().then(data=>{
    document.getElementById("nav").innerHTML = data;
})


footer().then(data=>{
    document.getElementById("footer").innerHTML = data;
})
