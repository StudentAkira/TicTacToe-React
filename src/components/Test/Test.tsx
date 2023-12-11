import { useEffect, useState } from 'react';
import './Test.css'

export default function Test(){

  const [counter, setCounter] = useState(0);

  useEffect(()=>{
    console.log("CALL USE EFFECT AFTER RE-RENDER", counter);
    return ()=>{
      console.log(counter);
    }
  })


  return (
    <>
      <button onClick={() => setCounter(counter + 1)}>INCREMENT</button>
      COUNTER :: {counter}
    </>
  )
}