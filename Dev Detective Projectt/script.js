// Get function is created which helps fetch elements by teir ids easily
const get = (param) => document.getElementById(`${param}`);
const modetext = get("mode-text"); // == document.getElementById("#mode-text")
const modeicon = get("mode-icon");
const root = document.documentElement.style;
const btnMode = get("btn-mode");
const searchbar = document.querySelector(".searchbar-container");
const btnSearch = get("submit");
const input = get("input");
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const profilecontainer = document.querySelector(".profile-container");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");

let darkMode = false;

 // 1st taking in account eventlistener on mode button, when it is clicked if dark mode is on it will switch to
// dark or vice versa
btnMode.addEventListener("click", function() {
    if(darkMode == false){
        darkModeProperties();
    }
    else{
        lightModeProperties();
    }
});

btnSearch.addEventListener( "click", function(){
    if(input.value !== ""){
        getUserData(url + input.value);
    }
});

// Next is input field.Ispe keydown wala event ho rha h
input.addEventListener("keydown", 
    function(e){
        if(!e){
            var e = window.event;
        }
        // Enter key dabaye to bhi search ho jaye
        if(e.key == "Enter"){
            if(input.value !== ""){
                getUserData(url + input.value);
            }
        }
    },false); // ye false third phase h eventlistener ka

input.addEventListener("input", function(){
    noresults.style.display = "none";
    searchbar.classList.add("active");
});

// This is the function to call API
function getUserData(gitUrl){
    fetch(gitUrl) // <- this is API call, fetch API
    // usually when api iscalled we use await but here we are using then , they both are kinda same there is only 
    // one difference that await does not let code after it excute but then does not let code inside it execute
    .then((response) => response.json())
    .then((data) =>{
      console.log(data);
      updateProfile(data);
    })
    .catch((error) => {
        throw error;
    });
}

// To update or render on UI
function updateProfile(data){
    // Ek message field hoti h
    if(data.message !== "Not Found"){
        noresults.style.display = "none";
        function checkNull(param1, param2) {
            if (param1 === "" || param1 === null) {
            param2.style.opacity = 0.5;
            param2.previousElementSibling.style.opacity = 0.5;
            return false;
            } else {
            return true;
            }
        }
        avatar.src = `${data.avatar_url}`;
        userName.innerText = data.name === null ? data.login : data.name;
        user.innerText = `@${data.login}`;
        user.href = `${data.html_url}`;
        datesegments = data.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;
        user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
        page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
        page.href = checkNull(data.blog, page) ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");
    } else {
        noresults.style.display = "block";
    }
}

// checking ki window ka support h bhi ki ni is mode ke liye
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const localStorageDarkMode = localStorage.getItem("daresfesf");
if (localStorageDarkMode === null) {
  localStorage.setItem("dark-mode", prefersDarkMode);
  darkMode = prefersDarkMode;
}
if (localStorageDarkMode) {
  darkMode = localStorageDarkMode;
  darkModeProperties();
} else {
  localStorage.setItem("dark-mode", prefersDarkMode);
  darkMode = prefersDarkMode;
  lightModeProperties();
}

// Dark mode function
function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    // Browser ki local storage me dark mode to true save kar diya
    localStorage.setItem("dark-mode", true);
  }

  // Light mode function
  function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false);
  }

profilecontainer.classList.toggle("active");
searchbar.classList.toggle("active");
// by default pranaygupta ki profile dikh rhi h
getUserData(url + "kareen12");