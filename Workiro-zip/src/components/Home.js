import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/reducers/counterSlice";

function Home() {
  const data =  useSelector((state)=>state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className='App'>
      <h1>Home Page</h1>
      <h3>Redux Data {data}</h3>
      <div>
        <button onClick={()=>dispatch(increment())}>Add</button>
        <button onClick={()=>dispatch(decrement())}>Substract</button>
      </div>
    </div>
  )
}

export default Home
