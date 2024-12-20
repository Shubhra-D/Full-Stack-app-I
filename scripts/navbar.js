const navbar = ()=>{
    let card = `<div id="nav-container">
        <a  id="logo" href="index.html">My Personal App</a>
        <div id="nav-links">
            <a href="signup.html">Sign Up</a>
            <a href="login.html">Login</a>
            <a href="todos.html">ToDos</a>
            <a href="expenses.html">Expenses</a>
        </div>
    </div>`
    document.getElementById("nav").innerHTML = card
};

navbar()
export{navbar}