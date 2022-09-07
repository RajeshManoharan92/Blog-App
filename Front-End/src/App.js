import './index.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AllBlog } from "./components/AllBlog"
import { Myblog } from "./components/Myblog"
import { Addblog } from "./components/Addblog"
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Forgotpassword } from "./components/forgotPassword";
import { Emailverification } from "./components/verification";
import React from "react";
import { Navbarr } from "./components/navbar"
import { AuthProvider } from "./auth";
import { RequireAuth } from "./RequireAuth";

export default function App() {

  return (

    // Router used for navigation through pages

    <div>
      <AuthProvider>
        <BrowserRouter>
          <Navbarr></Navbarr>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verification" element={<Emailverification />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route path="/AllBlog" element={<RequireAuth><AllBlog /></RequireAuth>} />
            <Route path="/Myblog" element={<RequireAuth><Myblog /></RequireAuth>} />
            <Route path="/Addblog" element={<RequireAuth><Addblog /></RequireAuth>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>


  )
}























