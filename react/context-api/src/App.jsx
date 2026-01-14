import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/Login';
import HomePageSection from './pages/HomePage/HomePage';

function App() {
  
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path='' Component={HomePageSection}/>
      <Route path='/login' Component={LoginPage}/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
