import React from 'react'
import { useState } from "react";
import { SigninInput } from "../types";
import { Link } from "react-router-dom";

export const Signin = () => {
    const [signinInputField, setSigninInput] = useState<SigninInput>({
        username: "",
        password: ""
    })
  return (
    <div className="signup h-screen w-full">
      <div className="signup-popup">
        <h2>Welcome back.</h2>

        <div className="input-fields">
            <LabelledInput name="Your Email" placeholder="" type={"text"} onChange={(e)=>{
                setSigninInput({
                    ...signinInputField,
                     username: e.target.value
                })
            }} />
            <LabelledInput name="Your Password" placeholder="" type={"password"} onChange={(e)=>{
                setSigninInput({
                    ...signinInputField,
                     password: e.target.value
                })
            }} />

            <button>
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