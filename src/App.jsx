import React from 'react'
import { useState,useCallback,useEffect,useRef } from 'react';
function App() {
const [length,setLength]=useState(5);
const [numberAllowed,setNumberAllowed]=useState(false);
const [charAllowed,setCharAllowed]=useState(false);
const [password,setPassword]=useState("");
const copyPasswordToClipboard=useCallback(()=>{
window.navigator.clipboard.writeText(password)
passwordRef.current.select()
},[password])
//useref hook
const passwordRef=useRef(null)
const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
  if(numberAllowed) str+="0123456789"
  if(charAllowed) str+="!@#$%^&*"
  for(let i=1;i<=length;i++)
  {
  let char=Math.floor(Math.random()*str.length+1)
  pass+=str.charAt(char)
  }
  setPassword(pass)
},
    [length,charAllowed,setPassword])
useEffect(()=>{
passwordGenerator();
},[charAllowed,numberAllowed,length,passwordGenerator])
return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700'>
    <h1 className='text-white text-center my-6'>Password Generator</h1>
   <div className='flex shadow rounded-lg overflow-hidden mb-4'>
   <input
    type='text'
    value={password}
    className='outline-none w-full py-1 px-3'
    placeholder='password'
    readOnly
    ref={passwordRef}
    >
    </input>
    <button 
    onClick={copyPasswordToClipboard}
    className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
    >copy</button>
   </div>
   <div className='flex text-sm gap-x-2'>
   <div className='flex items-center gap-x-1'>
   <input type='range'
   min={6}
   max={100}
   value={length}
   className='cursor-pointer'
   onChange={(e)=>{
    setLength(e.target.value)
   }}
   >
   </input>
   <label>length:{length}</label>
   <input type='checkbox'
   defaultChecked={numberAllowed}
   id='numberInput'
   onChange={()=>{
    setNumberAllowed((prev)=>!prev)
   }}
   >
   </input>
   <label htmlFor='numberInput' >Number</label>

   <input type='checkbox'
   defaultChecked={numberAllowed}
   id='characterInput'
   onChange={()=>{
    setCharAllowed((prev)=>!prev)
   }}
   >
   </input>
   <label htmlFor='characterInput' >character</label>
   </div>
   </div>
    </div>
    </>
  )
}

export default App
