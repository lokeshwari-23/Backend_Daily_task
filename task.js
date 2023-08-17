//1.Take a string as props and return the string in uppercase
import React from "react";
function Upper(props){
    
    return (
    <>
    <h2>{props.data.toUpperCase()}</h2>
    </>
    )
}
//===================================================================================

//2.Take a array as a props and filter out even number from the array

function Task(props)
{
   return props.data.toUpperCase();
}

function Filter(props)
{
    const result=props.arr.map((val)=>{
        if(val%2==0){
            return <li>{val}</li>
        }
    })
    return (
        <ul>{result}</ul>
    )
    
        
        
}

  



export  {Task};
export {Filter};

// export{ShoppingList};