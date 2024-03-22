import React, { useEffect, useState } from 'react'

function Counter({seconds, callback}) {
    const [count, setCount] = useState(seconds);

    useEffect(() => {
        let sec = seconds;
        const Timer = setInterval(() => {
            sec--;
            setCount(sec);
            if(sec <= 0){
                clearInterval(Timer);
                callback();
            }
        }, 1000);


        return()=> {
            clearInterval(Timer);
        };
    }, []);


    
  return (
    <div>{count}</div>
  )
}

export default Counter