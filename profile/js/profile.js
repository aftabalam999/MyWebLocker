// cheaking sessionStorage is present or not to secure this page from copy paste the url on new tab
    if (sessionStorage.getItem('user') === null) {
        window.location.replace("../index.html");
    }else
        {
            // Logout coding
            let logout = document.getElementById("logout");
            logout.onclick = function(){
                sessionStorage.clear();
                let logout_text = document.getElementById("logout_text");
                logout_text.innerHTML = "Please Wait...";
                setTimeout(function(){window.location = "../index.html";} ,2000);
            }
          
        //Profile name coding
            let user_email = sessionStorage.getItem("user");
            let json_text = localStorage.getItem(user_email);
            let obj_data = JSON.parse(json_text);
            let profile_name = document.getElementById("profile_name");
            profile_name.innerHTML = atob(obj_data.username);
            //this line(15) of code is for profile username it will redirect the username to profile picture bottom
            document.getElementById("profile_username").innerHTML = atob(obj_data.username);

            // profile picture coding
                let img_url = localStorage.getItem(user_email+"image")
                let profile_picture = document.getElementById("profile_picture");
                profile_picture.style.backgroundImage = "url("+img_url+")";
                //this line(20) of code is for profile picture it will redirect the picture to profil
                profile_picture.style.backgroundSize = "cover";
                profile_picture.style.backgroundPosition = "center";

            if(localStorage.getItem(user_email+"image") != null ){
                let page_cover = document.getElementById("container");
                page_cover.style.display = "none";
            }  
            // Profile name coding end
            //profile picture upload coding
                let profile_upload = document.getElementById("profile_upload");
                profile_upload.onchange = function(){
                    // we will get the file from the input field
                let reader = new FileReader();
                reader.readAsDataURL(profile_upload.files[0]);
                reader.onload = function(){
                let filename = reader.result;
                let profile_icon = document.getElementById("profile_icon");
                let profile_pic = document.getElementById("profile_pic");
                profile_pic.style.backgroundImage = "url("+filename+")";
                profile_pic.style.backgroundSize = "cover";
                profile_pic.style.backgroundPosition = "center";
                profile_icon.style.display = "none";
                let next_btn = document.getElementById("next");
                next_btn.style.display = "block";
                
                next_btn.onclick = function(){
                    localStorage.setItem(user_email+"image",filename);
                    let page_cover = document.getElementById("container");
                    page_cover.style.display = "none";
                    window.location = location.href;
                }
            }
        }
    }

