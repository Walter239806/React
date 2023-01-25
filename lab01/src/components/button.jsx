import { useState } from "react";

const ButtonCreate = ({title, onCountChange ,count})=>{

    const onHandleChange=()=>{
        if(title=== "Mas") count += 1;
        else if(count>0) count -= 1;
        onCountChange(count)

    } 

  


return(
    <button onClick={()=> onHandleChange()}>{title}</button>
)

}

export default ButtonCreate