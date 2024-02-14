import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from '../redux/reducers/counterSlice';

function ReduxCounter() {
  const data = useSelector((state)=>state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>{data}</h1>
      <div>
        <button onClick={()=>dispatch(increment())}>Add</button>
        <button onClick={()=>dispatch(decrement())}>Sub</button>
      </div>
    </div>
  )
}

export default ReduxCounter
