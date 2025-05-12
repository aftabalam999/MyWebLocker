/*
//this code is written by ai("Improve code" using vs code )
// Get elements
const tlogin = document.querySelector("#turn_login");
const tsignup = document.querySelector("#turn_signup");
const login = document.querySelector("#login");
const signup = document.querySelector("#signup");

// Function to toggle display
function toggleDisplay(show, hide) {
  show.style.display = "block";
  hide.style.display = "none";
}

// Add event listeners
tlogin.addEventListener("click", () => toggleDisplay(login, signup));
tsignup.addEventListener("click", () => toggleDisplay(signup, login));

*/
const login_btn = document.querySelector("#turn_login");
const signup_btn = document.querySelector("#turn_signup");
const login_box = document.querySelector("#login");
const signup_box = document.querySelector("#signup");

login_btn.onclick = function(){ 
    signup_box.style.display = "none"; 
    login_box.style.display = "block";
}

signup_btn.onclick = function(){
    login_box.style.display = "none";
    signup_box.style.display = "block";
}


/*************** End signup and login fliping code******************* */

