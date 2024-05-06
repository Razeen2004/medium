import React from 'react'
import { useState } from "react";
import { SigninInput, signinInput } from "../types";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const Signin = () => {
    const navigate = useNavigate();

    const [signinInputField, setSigninInput] = useState<SigninInput>({
        email: "",
        password: ""
    })

    const signinButton = async () => {
      try{
        const response = await axios.post("http://localhost:8787/api/v1/signin", signinInputField);
        const jwt = response.data.jwt;
        localStorage.setItem('token', jwt);
        navigate("/dashboard")
      }catch(e){
        // 
      }
    }
  return (
    <div className="signup h-screen w-full">
      <div className="signup-popup">
        <h2>Welcome back.</h2>

        <div className="input-fields">
            <LabelledInput name="Your Email" placeholder="" type={"text"} onChange={(e)=>{
                setSigninInput({
                    ...signinInputField,
                    email: e.target.value
                })
            }} />
            <LabelledInput name="Your Password" placeholder="" type={"password"} onChange={(e)=>{
                setSigninInput({
                    ...signinInputField,
                     password: e.target.value
                })
            }} />

            <button onClick={signinButton}>
                Continue
            </button>

            <p>
                Don't have an account?
                <Link to='/signup'>Signup</Link>
            </p>
        </div>

        <div className="text">
          <p>
            Click “Sign in” to agree to Medium’s Terms of Service and
            acknowledge that Medium’s Privacy Policy applies to you.
          </p>
        </div>
      </div>
    </div>
  )
}

interface LabelledInputType{
  name: string;
  placeholder: string;
  onChange: (e: any)=>void;
  type?: string;
}

const LabelledInput = ({name, placeholder, onChange, type}:LabelledInputType) => {
  return (
      <div className="input">
          <label>{name}</label>
          <input type={type} onChange={onChange} placeholder={placeholder} />
      </div>
  )
}