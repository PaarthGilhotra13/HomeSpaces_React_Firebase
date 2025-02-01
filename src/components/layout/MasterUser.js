import { Navigate,Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react"
import { FadeLoader } from "react-spinners";
export default function MasterUser(){
    const [userType,setUserType]=useState("")
    const userId=sessionStorage.getItem("userId")
    if(userId=="" || userId=="null" ||userId==null ||userId=="undefined"){
        toast.error("Please Login")
        return <Navigate to="/login"/>
    }
    return(
        <>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
        <ToastContainer/>
        </>
    );
}