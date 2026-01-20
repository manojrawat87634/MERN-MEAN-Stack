import { useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  const [data, setData] = useState(0);
  return <>

  <BrowserRouter>
  <NavLink to={"/"} >Home </NavLink>
  <NavLink to={"/about"} >About</NavLink>
  <Routes>
    <Route path="" Component={HomePage}></Route>
    <Route path="/about" Component={AboutPage}></Route>
  </Routes>
    </BrowserRouter>
  </>
}

export default App;