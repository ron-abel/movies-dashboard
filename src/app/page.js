"use client"


import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState,useEffect } from "react";
// import db from "./config/db";


export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const router  = useRouter();
  useEffect(() => {
    validateForm();
  }, [email,password]);

  const validateForm = () => {
    let errors = {};

    if(!email){
      errors.email = "Email is required."
    }
    else if(!/\S+@\S+\.\S+/.test(email)){
      errors.email = "Email is invalid."
    }

    if(!password){
      errors.password = "Password is required."
    }
    else if(password.length < 6){
      errors.password = "password must be at least 6 characters."
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    
  }

  const signIn =async () => {
    if(isFormValid){
      const data = await fetch("http://localhost:3000/api/users",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      if(data){
        router.push('/movies');
      }
    }
    else{
      alert("In valid credentials")
    }
  }

  return (

    <>
      <div className="card sign-page d-flex justify-content-center border-0 sign-in bg-transparent rounded-0 main-container">
        <form className="d-flex bg-transparent p-5 flex-column align-items-center justify-content-center">
          <h2 className="text-white">Sign in</h2>
          <div className="my-3  w-100">
            <input type="email" onChange={(e) => setEmail(e.target.value)} style={{ background: "#224958", color: "white" }} value={email} placeholder="Email" className="form-control  border-0 form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" />
            {errors.email && <div className="form-text error-message text-danger">{errors.email}</div>}
          </div>
          <div className="my-b w-100">
            <input style={{ background: "#224958", color: "white" }} onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder="Password" className="form-control border-0 form-control-sm" id="exampleInputPassword1" />
            {errors.password && <div className="form-text error-message text-danger">{errors.password}</div>}
          </div>
          <div className="my-3 form-check">
            <input style={{ background: "#224958", color: "white" }} type="checkbox" className="form-check-input border-0" id="exampleCheck1" />
            <label className="form-check-label fw-lighter text-white">Remember me</label>
          </div>
          <button type="button" onClick={signIn} className="btn sign-btn border-0 text-white">Login</button>
         
        </form>
      </div>
    </>
  );
}
