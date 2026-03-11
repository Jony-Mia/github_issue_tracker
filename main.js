const issuesContainer = document.getElementById("issuesContainer");
const issueDetailsAPI = "https://phi-lab-server.vercel.app/api/v1/lab/issue";
const issueAPI = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const loader = document.querySelector('.loader');
const noData = document.getElementById('noData');
const all    = document.getElementById('all');
const opened = document.getElementById('open');
const closed = document.getElementById("closed");
let   issues = [];
// User Credential
const user = localStorage.getItem("username");
const password = localStorage.getItem("password");

noData.style.display="none";  

if (!user || !password){
     window.open(`${window.location.origin}/github_issue_tracker/login.html`,"_self");
    }
// Fetch Issues from API
async function issuesLoader(){
    try {
       let res = await fetch(issueAPI);
     let issuesList = await res.json();
   if (!res.status===200) {
       loader.style.display="block";  
    }else{
       
    loader.style.display="none"    
    let info= issuesList.data.map( element => issues=element) ; 
    issueBox(info)
}
   } catch (error) {
    console.log('hello');
    
   }
  
}
// Search issues from API
async function searchField(){

    let search = document.getElementById('search').value.trim()
    if(search==='') return;

    try {
        let res    = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${search}`);
     if (!res.status===200) {
       loader.style.display="block";  
    }else{
        loader.style.display="none";  
        let result = await res.json();
        total.innerText = result.data.length;

        if (result.data.length===0) {
            noData.style.display="block"; 
        }else{
            noData.style.display="none";  
        }
        
        issueBox(result.data);
    }
    } catch (error) {
        console.log("data loading failed");
        
    }
    
}
// Filtering all issues by all, open, closed
async function filterData(type="all"){
     try {
     let res = await fetch(issueAPI);
     let issuesList = await res.json();
     let filterCategory = issuesList.data.filter(data=> type==="all"? data : data.status===type);
     
    if (type=="all") {
        all.classList.add('active')
        opened.classList.remove('active')
        closed.classList.remove('active')
    }else if (type==="open") {
        all.classList.remove('active')
        opened.classList.add('active')
        closed.classList.remove('active')
        
    }else{
        all.classList.remove('active')
        opened.classList.remove('active')
        closed.classList.add('active')
    }
    
    total.innerText = filterCategory.length
     issueBox(filterCategory);
     } catch (error) {
        console.log('Data does not loaded, filtring not possible');
        
     }
     
}

// Structure fo issues box
function issueBox(state){
    issuesContainer.innerHTML='';
    const total = document.getElementById('total');
    
         state.forEach(issueData=>{
        const date = new Date(`${issueData.createdAt}`);
    
          issuesContainer.innerHTML += `
            <div class="h-full" onclick="issueModal(${issueData.id})">
                <div class="shadow  h-full flex flex-col justify-between pt-4 rounded-tl-lg rounded-tr-2xl border-t-4 border-${issueData.status==="open" ? "green":"violet"}-400">
                    <div class="flex p-3 justify-between">
                        <div>
                            <img src="assets/${issueData.status==="open" ? "Open-Status":"Closed- Status "}.png" alt="">
                        </div>
                        <div>

                            <p class="badge badge-error bg-error/10 text-error badge-outline">High</p>
                        </div>
                    </div>
                    <div class=" p-3">
                        <h3 class="text-2xl my-3 font-bold" >${issueData.title}</h3>
                        <p>${issueData.description}</p>
                        <br>
                        <section>
                           <!-- <button class="badge badge-outline badge-error rounded-full"> 
                                <i class="fa-brands fa-android"></i>
                                 Bugs</button>
                            <button class="badge badge-outline badge-warning rounded-full">
                                <i class="fa-regular fa-life-ring"></i> 
                                Help Wanted</button>
                                -->
                                ${
                              issueData.labels.map(syn => ` <img src="assets/${syn}.png" width="40" class="badge badge-ghost badge-soft text-neutral hover:bg-[#f0faff]"/>${syn}`)
                                }

                        </section>

                    </div>
 
                <div class="mt-3 p-3 shadow rounded">
                    <p> ${issueData.author} </p>
                    <br>
                    <p>${date.getDate()}/${date.getMonth()}/${date.getFullYear()}/</p>
                </div>
            </div>
        </div>
    `;
     })
     
}
// issue modal
async function issueModal(modalId){

    let modalBox = document.getElementById('my_modal')
    let res = await fetch(`${issueDetailsAPI}/${modalId}`);
    let datas = await res.json()
    // console.log(datas.data);
    modalBox.showModal();
    let {title,description,status,labels,priority,author,createdAt} = datas.data;
    const date = new Date(`${createdAt}`);
    modalBox.innerHTML=`
     <div class="modal-box w-[90%] max-w-3xl ">
           
            <h2 class="text-2xl font-bold">${title}</h2> <br>
            <div class="flex text-gray-600 gap-2.5">
                <div class="badge rounded-full badge-${status==="open"? "success":"primary"} block h-auto text-white">${status==="open" ? "Open":"Closed"}</div>
                <div class="flex items-center gap-2">
                    <span class="block w-[8px] h-[8px] bg-green-600 rounded-full"></span>
                    <span class="font-semibold">Opened by ${author}</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="block w-[8px] h-[8px] bg-violet-700 rounded-full"></span>
                    <span class="font-semibold">${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</span>
                </div>
            </div>
            <br>
            <section>
               
            ${labels.map(syn =>`<img src="assets/${syn}.png" width="40" class="badge badge-warning badge-soft text-neutral hover:bg-[#f0faff]">${syn}</img>`)}
                
            </section>
            <p class="py-4">${description}</p>

            <section class="w-full m-auto ">
                <section class="p-3 grid grid-cols-2 bg-base-200 rounded-2xl">
                    <div class="">
                        <p>Assignee:</p>
                        <p class="font-semibold">${author}</p>
                    </div>
                    <div class="">
                        <p>Priority:</p>
                        <p><span class="text-white rounded-full cursor-auto btn btn-sm bg-red-600">${priority}</span></p>
                    </div>
                </section>
            </section>
            <div class="modal-action">
             <form method="dialog">
                <button class="btn btn-primary ">Close</button>
             </form>
            </div>
        </div>
    `;
}

issuesLoader()