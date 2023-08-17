/*4.create a form which should accept name and password you have to validate whether 
the name and password are not empty and password should be min 5 character in length*/

import React from "react";

function Validation(){
    let name=React.createRef();
    let password=React.createRef();
    const btn1=React.createRef();
    let Name=React.createRef();
    let Password=React.createRef();
    
    
const formSubmit=(e)=>{
    e.preventDefault();
   
    
    if(name.current.value===""){
        alert("Please enter your name");
    }
    else if(password.current.value===""){
        alert("Please enter your password");
    }
    
    else{
        Name.current.innerText="Name:" + name.current.value;
        Password.current.innerText="Password:"+password.current.value;
    }
   
}


return(
    <>
    <form onSubmit={formSubmit} className="clss">
        Name:<input type="text" name="name" ref={name}/>
        password:<input type="password" name="password" ref={password} maxLength={5} />
        <button type="submit">Submit</button>
        <p ref={Name}></p>
        <p ref={Password}></p>
       

    </form>
    </>
)}

 export default Validation;

