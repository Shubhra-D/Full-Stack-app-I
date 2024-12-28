import { baseurl} from "./baseUrl.js";


let form= document.getElementById("form")
form.addEventListener("submit",function(event){
    event.preventDefault();
    
    let username = form.username.value;
    let email = form.email.value;
    let password = form.password.value;//ye saari id hai .value ke pahle
    let gender = form.gender.value;
    let mobile = form.mobile.value;
    let userobj ={username,email,password,gender,mobile} 
    //to check whether user's email exists or not
    //after fetching the data "get request"
    fetch(`${baseurl}/users`)
    .then((res)=>res.json())
    .then((data)=>{
        let user = data.filter((e,i)=>e.email===email)
        if(user.length>0){
            //user present hai
            alert("User Already Exists ,Please Login")
            window.location.href= "login.html"
        }else{
            //user not exist so post the request
            fetch(`${baseurl}/users`,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(userobj)
            })
            
            .then(()=>{
                alert("Sign UP Successfull")
                window.location.href="login.html"
            });
            
        }
    }).catch((err)=>{
        console.log(err);
        alert("Something Went wrong,Please try again later")
    })
    
});
