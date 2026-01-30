import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={HomePage}/>
          <Route path='/profile/:id' Component={ProfilePage}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
