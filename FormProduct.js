import React from "react";
function FormProduct(props){
    const num1=React.createRef();
    const num2=React.createRef();
    const btn=React.createRef();


    const handleSubmit=(e)=>{
        e.preventDefault();
        btn.current.innerText=(parseInt(num1.current?.value||1)*parseInt(num2.current?.value||1))
       
    }
    return(
       
        <>
        <form onSubmit={handleSubmit} className="cls"> 
           Num1: <input type="number"  ref={num1}/>
            Num2:<input type="number"  ref={num2}/>
            <button type="submit">Product</button>
           <p ref={btn}></p>
        </form>
        </>
    )}

    export default FormProduct