
// localStorage.setItem('username',"admin");
// localStorage.setItem("password","admin123")


const submit = document.getElementById("submit");
const user = localStorage.getItem("username");
const password = localStorage.getItem("password");

submit.onclick = ()=>{


    const username = document.getElementById("gitemail").value;
    const pass = document.getElementById("password").value;
    if(!username && !pass) return;

    if(username === "admin" || pass === "admin123"){
    localStorage.setItem("username","admin")
    localStorage.setItem("password","admin123")
    window.open("http://127.0.0.1:5500","_self")
    }
    
}


if (user === "admin" && password==="admin123") {
   window.open("http://127.0.0.1:5500","_self")
}

