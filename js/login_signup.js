/*******************Start Signup coding**********************/
const signup_frm = document.getElementById("signup_frm");

signup_frm.onsubmit = function(){
    let user = btoa(document.getElementById("username").value);
    let email = btoa(document.getElementById("email").value);
    let phone = btoa(document.getElementById("phone").value);
    let pass = btoa(document.getElementById("password").value);

    const user_object_data = {username:user,email:email,phone:phone,password:pass}
    const user_text_object = JSON.stringify(user_object_data);

    if(user != "" && email != "" && phone !="" && pass != ""){
        localStorage.setItem(email, user_text_object);
        const signup_btn = document.getElementById("signup_btn");
        signup_btn.style.background = "#14b129";
        signup_btn.innerHTML = "<i class='fa-solid fa-circle-check'></i> Sign up Successfull !";
        setTimeout(function(){
            signup_btn.style.background = "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%";
            signup_btn.innerHTML = "Sign up";
            signup_frm.reset();
        },3000)
        return false
    }
}

/*******************End Signup coding**********************/

/*******************Start Signup email Validation coding**********************/

let email_input = document.getElementById("email");
email_input.onchange = function(){
    let email = btoa(document.getElementById("email").value);
    let warning = document.getElementById("email_notice");
    const signup_btn = document.getElementById("signup_btn");

    if(localStorage.getItem(email) != null){
        warning.style.display = "block";
        email_input.style.borderBottomColor = "red";
        signup_btn.disabled = true;
        signup_btn.style.background = "#ccc";

        email_input.onclick = function(){
            email_input.value = "";
            warning.style.display = "none";
            email_input.style.borderBottomColor = "#ccc";
            signup_btn.disabled = false;
            signup_btn.style.background = "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%";
        }
    }
}

/*******************End Signup Email Validation coding**********************/

/*******************start Login coding**********************/

let login_frm = document.querySelector("#login_frm");

login_frm.onsubmit = function(){
    let email = document.getElementById("login_email");
    let password = document.getElementById("login_password");
    let login_email_war = document.getElementById("login_email_warning");
    let login_password_war = document.getElementById("login_password_warning");

    if (localStorage.getItem(btoa(email.value)) == null) {
       login_email_war.style.display = "block";
       email.style.borderBottomColor = "red";

       email.onclick = function(){
        email.value = "";
        login_email_war.style.display = "none";
        email.style.borderBottomColor = "#ccc";
       }
    }else{
        let text_data = localStorage.getItem(btoa(email.value));
        let obj_data = JSON.parse(text_data); //JSON.parse will extract the data and convert into object
        let correct_email = obj_data.email;
        let correct_password = obj_data.password;

        if (btoa(email.value) == correct_email) {
            if (btoa(password.value) == correct_password) {
                sessionStorage.setItem("user",btoa(email.value));
                window.location.replace("profile/profile.html");
            }else{
                login_password_war.style.display = "block";
                password.style.borderBottomColor = "red";

                password.onclick = function(){
                    password.value = ""; 
                login_password_war.style.display = "none";
                password.style.borderBottomColor = "#ccc";
                }
            }
        }
    }
    return false;
}

/*******************End Login coding**********************/
