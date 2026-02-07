import { useState } from 'react'


function App() {

  return (
    <>
    {/* <h1 className=' text-white bg-red-100'>Heading One</h1>
    <h1 className='text-[21px] bg-red-100'>Heading One</h1>
    <h1 className='text-[21px] bg-red-100'>Heading One</h1>
    <h1 className='font-bold font-mono bg-red-100'>Heading One</h1>
      <button className= 'underline hover:bg-blue-700 shadow m-1 px-4 py-4  w-100 bg-blue-100'>Click me</button> */}
    {/* sm, md, xl , 2xl  */}
    {/* block, inline , inline-block, hidden, flex, grid */}
    <div className='md:hidden'>
      <h1>Phone</h1>
    </div>
    <div className='hidden md:block xl:hidden'>
      <h1>Tablet</h1>
    </div>
    
    <div className='hidden xl:block'>
      <h1>Laptop</h1>
    </div>
    </>
  )
}

export default App
