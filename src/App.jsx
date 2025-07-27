import { useState,useCallback, useEffect,useRef } from 'react'
import './App.css'
function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("")
  const passwordRef=useRef(null);
  //useCallback hook
  const passwordGenerator=useCallback (() => {
	let pass=""
	let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	if(numberAllowed) str+="0123456789"
	if(charAllowed) str+="!@#$%^&*()-_=+[]{}|;:,.<>?/`~"
	for(let i=1;i<=length;i++)
	{
  	let char=Math.floor(Math.random()* str.length+1)
    pass += str.charAt(char)
	}
	setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

//useRef hook
const copyPswd = useCallback(()=> {
	passwordRef.current?.select();
  window.navigator.clipboard.writeText(password);
  /*
  console.log("Window global object:",window);
  console.log("Navigator:",navigator)
	console.log("Clipboard object:", navigator.clipboard);
    	console.log("Clipboard object:", navigator.clipboard.readText);
*/
},[password])
  //useEffect hook
useEffect(() => {
  passwordGenerator()
  },[passwordGenerator])
  return (
	<>
  <div className="w-full max-w-md mx-auto shadow-lg rounded-2xl px-6 py-6 my-12 bg-gradient-to-br from-gray-800 to-gray-900 text-orange-400">
    <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input type="text" value={password} className='outline-none w-full py-2 px-3 text-sm bg-gray-700 text-white rounded-l-lg' placeholder='passowrd'readOnly ref={passwordRef} />
    <button
    onClick={copyPswd}
    className='bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white px-4 py-2 text-sm rounded-r-lg' >
    copy
  </button>
    </div>    
   <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} className='cursor-pointer' value={length} onChange={(e)=>{console.log("event object (e):", e);
      console.log("e.target:", e.target);
      console.log("e.target.value:", e.target.value);setLength(e.target.value)}}></input>
          <label>Length:{length}</label>
      </div>
     {/*for numbers*/}
      <div className='flex items-center gap-x-1'>
    <input
      type="checkbox" checked={numberAllowed} id="numberInput" onChange={() => setNumberAllowed(prev => !prev)}
    />
    <label htmlFor='numberInput'>Numbers</label>
      </div>
    {/*characters*/}
    <div className='flex items-center gap-x-1'>
    <input
      type="checkbox"
      checked={charAllowed}
      id="charInput"
      onChange={() => setCharAllowed(prev => !prev)}
    />
    <label htmlFor='characterInput'>Characters</label>
    </div>
   </div>
 </div>
	</>
  )
}
export default App
