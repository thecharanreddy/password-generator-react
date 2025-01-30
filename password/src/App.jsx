import { useCallback, useEffect, useState, useRef } from 'react'



function App() {

  const [length, setLength] = useState(6)
  const [password,setPassword] = useState("")
  const [includeNums,setIncludeNums] = useState(false)
  const [includeSymbols,setIncludeSymbols] = useState(false)

  //useRef
  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(()=>{
    let pass=''
    let str ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if(includeNums) str +='0123456789'
    if(includeSymbols) str += '!@#$%^&*()_+-=[]{}'

    for(let i = 0; i < length; i++){
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[length, includeNums, includeSymbols, setPassword])
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])


   useEffect(()=>{
    PasswordGenerator()
    },[length, includeNums, includeSymbols, PasswordGenerator])

  return (
    <>
    
      <h1 className=" mt-15 mb-2 mx-5 p-5 text-5xl text-center text-orange-300 " >Password Generator</h1>
    
      <div className='w-full max-w-md mx-auto p-4 my-4 bg-gray-700 text-orange-400 shadow-md rounded-lg'>
       
        <div className='my-1.5 p-2'>
          <input type="text" 
           placeholder='password'
           value={password} 
           readOnly
           className= "bg-gray-500 py-1 px-3 rounded-lg"
           ref={passwordRef}
           ></input>
          <button onClick={copyPasswordToClipboard} className='p-0.5 bg-blue-600 text-white rounded-lg '>Copy</button>
        </div>

        <div>
          <input type='range' 
            min='6'
            max='20'
            value = {length}
            onChange={(e) => {parseInt(setLength(e.target.value))}}
          ></input>
          <label>length:{length}</label>
        </div>

        <div>
          <input type="checkbox" 
           id ="includeNums"
           defaultChecked={includeNums}
           onChange={()=>{
            setIncludeNums((prev) => !prev)
           }}
          ></input>
          <label htmlFor='includeNums'>Numbers</label>
        </div>

        <div>
          <input type="checkbox"
            id="includeSymbols"
            defaultChecked={includeSymbols}
            onChange={()=>
              {setIncludeSymbols((prev)=>!prev)} } 
          ></input>
          <label htmlFor='includeSymbols'>Symbols</label>
        </div>

      </div>
    </>
  ) 
}

export default App
