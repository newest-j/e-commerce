import { footer , homeNav } from "./utils.js";

footer().then(data=>{
    document.getElementById("footer").innerHTML = data;
})


homeNav().then(data=>{
    document.getElementById("nav").innerHTML = data;
})