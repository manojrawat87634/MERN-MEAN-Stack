import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Profile from './Profile'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Home from './component/HomePage'
import Contact from './component/Contact'
import About from './component/About'
import UserProfile from './component/UserProfile'

function App() {
  const [data, setData] = useState(0);
  const getData = async ()=>{
    const data = await fetch('http://localhost:3000/');
    const res = await data.json();
    setData(res.data);
  }
  useEffect(()=>{
    getData();
  }, [])
  // getData();
  return (
    <>
    <BrowserRouter>

    <NavLink to={""}>Home Page</NavLink>
    <NavLink to={"/contact"}>Contact Page</NavLink>
    <NavLink to={"/profile"}>Profile Page</NavLink>
    <NavLink to={"/about"}>About Page</NavLink>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/contact' Component={Contact}/>
        <Route path='/profile' Component={Profile}/>
        <Route path='/profile/:id' Component={UserProfile}/>
        <Route path='/about' Component={About}/>
      </Routes>
    </BrowserRouter>
      {/* <h1>{data}</h1> */}
      {/* <button onClick={() => { setData(data + 1) }}>Increase</button> */}
    </>
  )
}

export default App
