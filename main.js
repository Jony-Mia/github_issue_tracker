
const issuesContainer = document.getElementById("issuesContainer")
const loader = document.querySelector('.loader');
const issueAPI = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

// User Credential

const user = localStorage.getItem("username");
const password = localStorage.getItem("password");

if (!user || !password) window.open("http://127.0.0.1:5500/login.html","_self");

let issues=[];

async function issuesLoader(){
   let res = await fetch(issueAPI);
   let issuesList = await res.json();
   if (!res.status===200) {
       loader.style.display="block";  
    }else{
       
    loader.style.display="none"    
    issuesList.data.forEach(element => {
        issues.push(element);
    }); 
   }
issueBox()
}



/**
 *   {
      "id": 1,
      "title": "Fix navigation menu on mobile devices",
      "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
      "status": "open",
      "labels": [
        "bug",
        "help wanted"
      ],
      "priority": "high",
      "author": "john_doe",
      "assignee": "jane_smith",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
 */
function issueBox(state){
    issuesContainer.innerHTML='';
    issues.forEach(issueData=>{
    const date = new Date(`${issueData.createdAt}`);
    
          issuesContainer.innerHTML += `
     <div class="h-full">
                <div class="shadow p-3 py-4 rounded-tl-2xl rounded-tr-2xl border-t-4 border-${issueData.status==="open" ? "green":"violet"}-400">
                    <div class="flex justify-between">
                        <div>
                            <img src="assets/${issueData.status==="open" ? "Open-Status":"Closed- Status "}.png" alt="">
                        </div>
                        <div>

                            <p class="badge badge-error bg-error/10 text-error badge-outline">High</p>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-2xl my-3 font-bold" >${issueData.title}</h3>
                        <p>${issueData.description}</p>
                        <br>
                        <section>
                            <button class="badge badge-outline badge-error rounded-full"> 
                                <i class="fa-brands fa-android"></i>
                                 Bugs</button>
                            <button class="badge badge-outline badge-warning rounded-full">
                                <i class="fa-regular fa-life-ring"></i> 
                                Help Wanted</button>

                        </section>

                    </div>
                </div>
                <div class=" p-3 shadow rounded-bl-2xl  rounded-br-2xl">
                    <p> ${issueData.author} </p>
                    <br>
                    <p>${date.getDate()}/${date.getMonth()}/${date.getFullYear()}/</p>
                </div>
            </div>
    
    `;

    })

  
}













issuesLoader()