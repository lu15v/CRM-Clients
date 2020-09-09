import React,{useState, useEffect} from 'react';

const Redirect =(props) => {
    const {redTime, redFun} = props;

    const [timeLeft, setTimeLeft] = useState(redTime);

    useEffect(()=>{
        setTimeout(() => {
            setTimeLeft(timeLeft => timeLeft - 1)
        }, 1000);
        if(timeLeft === 0){
            redFun()
        }
    },);

    return(
        <>
            <h1>Forbidden</h1>
            <h2>{`You'll automatically  be redirected to the login page in ${timeLeft}s`}</h2>
            <p>If you have troubles with the website, please click on the button to redirect</p>
            <button onClick={redFun}>Redirect me</button>
        </>
    )
};



export default Redirect;