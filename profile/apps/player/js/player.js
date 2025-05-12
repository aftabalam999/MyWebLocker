let current_user = sessionStorage.getItem("user");
let video = document.getElementById("video_player");
let play_btn = document.getElementById("play_btn");
// play pause coding
play_btn.onclick = function(){
    if(play_btn.className == "fas fa-play-circle"){
        video.play();
        play_btn.className = "fas fa-pause-circle";
    }else if(play_btn.className == "fas fa-pause-circle"){
        video.pause();
        play_btn.className = "fas fa-play-circle";
    }
}

// progress bar coding
video.ontimeupdate = function(){
    let t_duration = this.duration;
    let c_duration = this.currentTime;
    let p_bar = document.getElementById("progress_bar");
    let v_timing = document.getElementById("v_timing");
    let sec = c_duration - parseInt(c_duration/60)*60;
    let t_sec = t_duration - parseInt(t_duration/60)*60;
    v_timing.innerHTML = parseInt(c_duration/60)+":"+parseInt(sec)+" / "+parseInt(t_duration/60) +":"+parseInt(t_sec);
    let slide_per = parseInt(c_duration*100/t_duration);
    p_bar.style.width = slide_per+"%";

    if(c_duration == t_duration){
        play_btn.className = "fas fa-play-circle";
    }
}

// open and close video box
let open_video_box_btn = document.getElementById("open_video_box_btn");
open_video_box_btn.onclick = function(){
    let add_video_box = document.getElementById("add_video_box");
    if(open_video_box_btn.className == "fa-solid fa-circle-plus"){
        add_video_box.style.display = "block";
        open_video_box_btn.className = "fa-regular fa-circle-xmark";
    }else if(open_video_box_btn.className == "fa-regular fa-circle-xmark"){
        add_video_box.style.display = "none";
        open_video_box_btn.className = "fa-solid fa-circle-plus";
    }
}

/* add video in local storage */
let add_video_btn = document.getElementById("add_video_btn");
add_video_btn.onclick = function(){
    let v_name = document.getElementById("video_name");
    let v_link = document.getElementById("video_link");
    if(v_name.value != "" && v_link.value != ""){
        let v_obj = {
            name: v_name.value,
            link: v_link.value
        };
        let v_txt = JSON.stringify(v_obj);
        localStorage.setItem(current_user+"video"+v_name.value, v_txt);
    }
}

// fetch all videos from local storage 
function load_video(){
    let i;
    for(i=0; i<localStorage.length; i++){
        let all_keys = localStorage.key(i);
        if(all_keys.match(current_user+"video")){
            let v_data =localStorage.getItem(all_keys);
            let video_obj = JSON.parse(v_data);
            
            let div = document.createElement("DIV");
            div.setAttribute("id", "main_video_box");

            let p = document.createElement("P");
            p.setAttribute("id", "playlist_video_name");
            p.className = ("p_v_name");
            p.innerHTML = video_obj.name;

            let play_btn = document.createElement("BUTTON");
            play_btn.setAttribute("id", "video_play_btn");
            play_btn.setAttribute("type", "button");
            play_btn.setAttribute("url", video_obj.link);
            play_btn.className = "v_play_btn";
            play_btn.innerHTML = "Play";

            let del_btn = document.createElement("BUTTON");
            del_btn.setAttribute("id", "video_delete_btn");
            del_btn.setAttribute("type", "button");
            del_btn.innerHTML = "Delete";
            del_btn.className = "delete_btn";

            div.appendChild(p);
            div.appendChild(play_btn);
            div.appendChild(del_btn);

            let all_v = document.getElementById("bottom");
            all_v.appendChild(div);
        }
    }

}
load_video();

// play video from playlist

function play_video(){
    let all_v_play_btn = document.getElementsByClassName("v_play_btn");
    let i;
    for(i=0; i<all_v_play_btn.length; i++){
        all_v_play_btn[i].onclick = function(){
            clear();
            let v_url = this.getAttribute("url");
            let src_tag = document.getElementById("video_src");
            src_tag.setAttribute("src",v_url);
            video.load();
            video.play();
            play_btn.className = "fas fa-pause-circle";
            this.innerHTML = "Playing...";
        }
    }
}
play_video();

function clear(){
    let all_v_play_btn = document.getElementsByClassName("v_play_btn");
    let i;
    for(i=0; i<all_v_play_btn.length; i++){
        all_v_play_btn[i].innerHTML = "Play";
    }
}

// next button coding

function next_button(){
    let next_btn = document.getElementById("right_btn");
    next_btn.onclick = function(){
        let all_play_btn = document.getElementsByClassName("v_play_btn");
        let i;
        for(i=0; i<all_play_btn.length; i++){
            if(all_play_btn[i].innerHTML == "Playing..."){
                let next_element = all_play_btn[i].parentElement.nextSibling;
                next_element.getElementsByClassName("v_play_btn")[0].click();
                return false;
            }
        }        
        if(next != null){
            clear();
            let v_url = next.getAttribute("url");
            let src_tag = document.getElementById("video_src");
            src_tag.setAttribute("src",v_url);
            video.load();
            video.play();
            play_btn.className = "fas fa-pause-circle";
            next.innerHTML = "Playing";
        }
    }
}
next_button();

// previous button coding

function previous_button(){
    let previous_btn = document.getElementById("left_btn");
    previous_btn.onclick = function(){
        let all_play_btn = document.getElementsByClassName("v_play_btn");
        let i;
        for(i=0; i<all_play_btn.length; i++){
            if(all_play_btn[i].innerHTML == "Playing..."){
                let previous_element = all_play_btn[i].parentElement.previousSibling;
                previous_element.getElementsByClassName("v_play_btn")[0].click();
                return false;
            }
        }
    }
}
previous_button();

// delete button coding
function delete_button(){
    let all_del_btn = document.getElementsByClassName("delete_btn");
    let i;
    for(i=0; i<all_del_btn.length; i++){
        all_del_btn[i].onclick = function(){
            let parent = this.parentElement;
            let video_name = parent.getElementsByTagName("P")[0].innerHTML;
            localStorage.removeItem(current_user+"video"+video_name);
            parent.className = "animate__animated animate__bounceOut";
            setTimeout(function(){
                parent.remove();
            }, 1000);
        }
    }
}
delete_button();

/*Volume Coding */
function volume(){
    let vol_icon = document.getElementById("volume");
    vol_icon.onclick = function(){
        let vol_control = document.getElementById("vol_control");
        if(vol_control.style.display == "none"){
            vol_control.style.display = "block";
            vol_control.oninput = function(){
                video.volume = this.value;
            }
        }else{
            vol_control.style.display = "none";
        }
    }
}
volume();

// duration progress bar coding
let p_box = document.getElementById("progress_box");
p_box.onclick = function(event){
    let per = event.offsetX/this.offsetWidth;
    video.currentTime = per*video.duration;
}

// full screen coding
let full = document.getElementById("full_screen");
full.onclick = function(){
    video.requestFullscreen();
}

// speed coding
let speed_icon = document.getElementById("speed_icon");
speed_icon.onclick = function(){
    let speed_slider = document.getElementById("speed_control");
    if(speed_slider.style.display == "none"){
        speed_slider.style.display = "block";
        speed_slider.oninput = function(){
            video.playbackRate = this.value;
        }
    }else{
        speed_slider.style.display = "none";
    }
}

// search video coding
let search_box = document.getElementById("search");
search_box.oninput = function(){
    let all_v_name = document.getElementsByClassName("p_v_name");
    let i;
    for(i=0; i<all_v_name.length; i++){
        if(all_v_name[i].innerHTML.toUpperCase().match(search_box.value.toUpperCase())){
            all_v_name[i].parentElement.style.display = "block";
        }else{
            all_v_name[i].parentElement.style.display = "none";
        }
    }
}