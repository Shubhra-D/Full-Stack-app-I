import { baseurl} from "./baseUrl.js";


let form= document.getElementById("form")
form.addEventListener("submit",function(){
    event.preventDefault();
    //form shows a default behaviour of refresh to avoid that we used above
    let email = form.email.value;
    let password = form.password.value;
    let userobj ={email,password} 
    //to check whether user's email exists or not
    //after fetching the data "get request"
    fetch(`${baseurl}/users`)
    .then((res)=>res.json())
    //data handles the stored values
    .then((data)=>{
        let user = data.filter((e,i)=>e.email===email)
        //if user is already present then search for password
        if(user.length>0){
            //user present hai
            if(user[0].password==password){
                alert("Login Success.......");
               // after the user has logged in let store it's data in local storage
               localStorage.setItem("loginData",JSON.stringify(user[0]))
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
