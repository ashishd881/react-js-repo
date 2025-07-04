import { useState,useCallback ,useEffect,useRef} from 'react'



function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed ,setNumberAllowed ] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const[passward,setPassward] = useState("")
// ref hook 
const passwordref = useRef(null)

const copypasswordTOClipboard = useCallback(() => {
  passwordref.current?.select() 
  // passwordref.current?.setSelectionRange(0,3) // will select in the given range
  /// here the main use of useref is to select the object by giving effect
  window.navigator.clipboard.writeText(passward)
},[passward])


  const passwordGenerator = useCallback(() =>{
    let pass = "";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str+="0123456789"
    }
    if (charAllowed) {
      str+="!@#$%^&*-_+=[]{}~`"
    }

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random()*str.length+1);
     pass += str.charAt(char); // tells us which character we have to use

    }

    setPassward(pass)


  },[length,numberAllowed,charAllowed,setPassward])



useEffect(() => {passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md
      rounded-lg px-4 my-8 text-orange-500 bg-gray-700 '>

      
     <h1 className='text-white text-center my-3'>Passward Generator</h1>
     <div className='flex shadow bg-violet-200 rounded-lg overflow-hidden mb-4'>
      <input type='text' value={passward}
      className='outline-none w-full py-1 px-3'
      placeholder='passwards'
      readOnly 
      ref={passwordref}
      //  due to which no body will be able to write
       />

      <button
       className='outline-none bg-yellow-400 text-black 
       px-3 py-0.5 shrink-0'
       onClick={copypasswordTOClipboard}>Copy</button>
     </div>
      <div className='flex text-sm gap-2'>
        <div className='flex items-center gap-x-1
        '>
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) =>{setLength(e.target.value)}}
          />
          <label >length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={() => {
            setNumberAllowed((prev) => !prev)
          }}
           /> 
           <label htmlFor='numberInput'>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
            type='checkbox'
            defaultChecked={charAllowed}
            id='charInput'
            onChange={()=>{
              setCharAllowed((prev) => !prev)
            }}
          /><label htmlFor='charInput'>Characters</label>

        </div>
      </div>
     </div>
     
   </>
  )
}

export default App
