import { useState, useEffect} from "react";
const PageTitle= (props)=>{
    const [title]= useState(props.title);
    const [count, setCount]= useState(props.count);


    return(
        <p>
            {title} : {props.count+1}
        </p>
    )
}

export default PageTitle