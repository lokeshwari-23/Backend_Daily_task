
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