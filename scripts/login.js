import { baseurl} from "./baseUrl.js";


let form= document.getElementById("form")
form.addEventListener("submit",function(event){
    event.preventDefault();
    
    //let username = form.username.value;
    let email = form.email.value;
    let password = form.password.value;
    //let gender = form.gender.value;
    //let mobile = form.mobile.value;
    let userobj ={email,password} 
    //to check whether user's email exists or not
    //after fetching the data "get request"
    fetch(`${baseurl}/users`)
    .then((res)=>res.json())
    .then((data)=>{
        let user = data.filter((e,i)=>e.email===email)
        //if user is already present then search for password
        if(user.length>0){
            //user present hai
            if(user[0].password==password){
                alert("Login Success.......")
                window.location.href = "todos.html"
            }else{
                alert("Password wrong ,Please enter forget password")
            }
        }else{
            //user not exist 
           alert("User Does Not Exist ,Please Sign Up....") 
           window.location.href= "signup.html" 
        }
    }).catch((err)=>{
        console.log(err);
        alert("Something Went wrong,Please try again later")
    })
    
});