
// localStorage.setItem('username',"admin");
// localStorage.setItem("password","admin123")


const submit = document.getElementById("submit");
const user = localStorage.getItem("username");
const password = localStorage.getItem("password");

submit.onclick = ()=>{
    let username = document.getElementById("gitemail").value.trim();
    let pass = document.getElementById("password").value.trim();
  
    if(!username && !pass) return;

    if(username === "admin" && pass === "admin123"){
    localStorage.setItem("username","admin")
    localStorage.setItem("password","admin123")
    window.open(`${window.location.origin}/github_issue_tracker`,"_self")
    }else{
        username="";
        pass=""
        alert('Wrong Password')
    } 
    
}


if (user === "admin" && password==="admin123") {
   window.open(`${window.location.origin}/github_issue_tracker`,"_self")
}

