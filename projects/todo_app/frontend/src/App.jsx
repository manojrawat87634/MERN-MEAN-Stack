import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './loginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/RegisterPage/RegisterPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' Component={Login}> </Route>
        <Route path='/dashboard' Component={Dashboard}> </Route>
        <Route path='/register' Component={Register}> </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
