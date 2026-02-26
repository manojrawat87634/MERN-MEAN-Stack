import { useState } from 'react'
import HomePage from './HomePage'
import { NavLink, Route, Routes } from 'react-router-dom'
import AboutPage from './AboutPage'
import Navbar from './component/Navbar'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='' Component={HomePage}/>
        <Route path='/about' Component={AboutPage}/>
        <Route path='/register' Component={RegisterPage}/>
      </Routes>
    </>
  )
}

export default App
