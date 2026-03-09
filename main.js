
const issuesContainer = document.getElementById("issuesContainer")
const loader = document.querySelector('.loader');
const issueAPI = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const issueDetailsAPI = "https://phi-lab-server.vercel.app/api/v1/lab/issue";

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
function issueBox(state='all'){
    issuesContainer.innerHTML='';
    let filterCategory = issues.filter(data=> state==="all"? data : data.status===state);
    
    filterCategory.forEach(issueData=>{
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
                              issueData.labels.map(syn =>`<button class="badge badge-warning badge-soft text-neutral hover:bg-[#f0faff]">${syn}</button>`)
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

async function issueModal(modalId){

    /**
     *  {
"id": 33,
"title": "Add bulk operations support",
"description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
"status": "open",
"labels": [
"enhancement"
],
"priority": "low",
"author": "bulk_barry",
"assignee": "",
"createdAt": "2024-02-02T10:00:00Z",
"updatedAt": "2024-02-02T10:00:00Z"
}
     */

    let modalBox = document.getElementById('my_modal')
    let res = await fetch(`${issueDetailsAPI}/${modalId}`);
    let datas = await res.json()
    // console.log(datas.data);
    modalBox.showModal();
    let {title,description,status,labels,priority,author,createdAt} = datas.data;
    const date = new Date(`${createdAt}`);
    modalBox.innerHTML=`
     <div class="modal-box w-2xl max-w-3xl ">
           
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
               
                ${
                    labels.map(syn => `<button  class="btn bg-[#f0faff] text-neutral hover:bg-[#f0faff]">${syn}</button>`)
                }
                



            </section>
            <p class="py-4">${description}</p>

            <section class="w-full m-auto">
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