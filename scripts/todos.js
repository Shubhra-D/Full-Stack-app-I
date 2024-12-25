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
            "content-type":"application/json"
        },
        body:JSON.stringify(todoObj)
     }).then(()=>{
        alert("Todo Added")
     }).catch((err)=>{
        alert("Something Went wrong with TODO ")
        console.log(err)
     })

});


async function getTodos(){
    try{
        let res =await fetch(`${baseurl}/todos`)
        let data = await res.json();
        return data
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

        let priority=document.createElement("h5")
        priority.textContent = `Priority:${e.priority}`;

        let status = document.createElement("h5")
        status.textContent = e.status==true? "Status:Completed": "Status:Pending";

        card.append(title,deadline,priority,status);

        cont.append(card);
   });
}
window.onload = async()=>{
   let arr = await getTodos();
   displayTodos(arr);
}