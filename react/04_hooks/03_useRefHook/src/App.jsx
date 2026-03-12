import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Timer from './component/Timer'
import Counter from './component/Counter'
import InputFocus from './component/InputFocus'
import Demo from './component/Demo'
import SearchSuggetion from './projects/SearchSuggetions'

function App() {
  
  return (
    <>
      {/* <Timer /> */}
      {/* <Counter /> */}
      {/* <InputFocus /> */}
      {/* <Demo /> */}
      <SearchSuggetion />
    </>
  )
}

export default App
