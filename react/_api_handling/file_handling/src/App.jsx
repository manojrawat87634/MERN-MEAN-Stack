import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [file, setFile] = useState(null)

  const postRequest = async ()=>{
    if (file == null) return;
    const formData = new FormData();
    formData.append('file', file);
    const data = await fetch('http://localhost:3000/upload', {
      method : "POST",
      body : formData
    });
    const res = await data.json();
    console.log(res);
  }
  return (
    <>
     <input type="file" onChange={(e)=>{
      setFile(e.target.files[0]);
     }}/>

     <button onClick={postRequest}>Submit</button>
    </>
  )
}

export default App
