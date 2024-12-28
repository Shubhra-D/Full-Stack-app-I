import { baseurl } from "./baseUrl.js";

document.getElementById("logout").addEventListener("click",function(){
    localStorage.removeItem("loginData")
    alert("Redirecting to Home Page");
    window.location.href="index.html"
})


let loginData = JSON.parse(localStorage.getItem("loginData"))
//what id login data got deletd from local storage that user will no longer be logged in
if(loginData==null){
    alert("Please Login.....")
    window.location.href="login.html"
}
console.log(loginData);

document.getElementById("user-name").textContent =`Welcome , ${loginData.username}`;
//By this I will get my name on todos page with welcome;;

let form = document.getElementById("form-todo");
form.addEventListener("submit",function(){
    event.preventDefault()
   let title = form.title.value;
   let deadline = form.deadline.value;
   let priority = form.priority.value;
   let todoObj = {title,deadline,priority,status:false,userId:loginData.id}//i want ot store some objects so keep inside the curly braces
   //console.log(todoObj);
//push this data to Json server
     fetch(`${baseurl}/todos`,{
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify(todoObj)
     }).then(()=>{
        alert("Todo Added")
     }).catch((err)=>{
        alert("Something Went wrong with TODO Adding")
        console.log(err)
     })

});


async function getTodos(){
    try{
        let res =await fetch(`${baseurl}/todos`);
        let data = await res.json();
        let userTodos = data.filter((e,i)=>e.userId==loadData.id)
        return userTodos;
    }catch(err){
       alert("Something went wrong in getting TODO ")
       console.log(err);
    }
}

function displayTodos(arr){
   let cont =  document.getElementById("todo-container");
   cont.innerHTML = "";

 arr.map((e,i)=> {
    let card = document.createElement("div")
        card.setAttribute("class","todo-card");
       
        let title = document.createElement("h5")
       title.textContent = `Title:${e.title}`;
        
        let deadline = document.createElement("h5")
        deadline.textContent = `Deadline:${e.deadline}`;
        let d = new Date(e.deadline)
        if(d < Date.now() && e.status == false){
         card.classList.add("pending");//jo pending status hai use catch kar rhi hu highlight karneko
        }//classlist  is given instead of "setAttribute" but it will overwrite the id styling 

        let priority=document.createElement("h5")
        priority.textContent = `Priority:${e.priority}`;

        let status = document.createElement("h5")
        status.textContent = e.status==true? "Status:Completed": "Status:Pending";
//will add a button here to update the status
        let updateStatusButton = document.createElement("button")
        updateStatusButton.textContent = `Toggle Status`
        updateStatusButton.addEventListener("click",function(){
           updatestatusfun(e,i)
        }); 
        card.append(title,deadline,priority,status);

        cont.append(card);
   });
}
window.onload = async()=>{
   let arr = await getTodos();
   displayTodos(arr);
}

async function loadData(){
   let arr = await getTodos();
   displayTodos(arr);
}



function updatestatusfun(e,i){//here i will update the status in local storage
 //  console.log("before",e)
  let updatedTodo = {...e,status:true};
  //console.log("after",updatedTodo)
  //now fetch the url to patch/put it to json
  let todoId = e.id;
  fetch(`${baseurl}/todos/${todoId}`,{
   method:"PATCH",
   headers:{
      "content-type":"application/json",
   },
   body:JSON.stringify(updatedTodo)
  }).this(()=>{
   alert("Todo Updated");
   //window.location.reload()
   loadData()
  }).catch((err)=>{
     alert("Something went wrong in updates")
     console.log(err)
  })
}
































