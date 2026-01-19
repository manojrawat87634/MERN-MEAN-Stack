import React, { useContext } from "react";
import FirstSection from "./FirstSection/FirstSection";
import SecondSection from "./FirstSection/SecondSection";
import { DataContext } from "../../context";
import { Navigate } from "react-router-dom";

const HomePageSection = ()=>{
        const {isLogin, setIsLogin } = useContext(DataContext);
    return <>
    {isLogin == true ? "Data" : <Navigate to={"/login"}>Login Page</Navigate>}
    <FirstSection/>
    <SecondSection />
    </>
}

export default HomePageSection;