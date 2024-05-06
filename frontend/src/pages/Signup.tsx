import { useState } from "react";
import "./Auth.css";
import { SignupInput } from "../types";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export const Signup = () => {

    const navigate = useNavigate();

    const [signupInputField, setSignupInput] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    const signupBtn = async () => {
        try{
            const response = await axios.post("http://localhost:8787/api/v1/signup",signupInputField)
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate('/dashboard');
        }catch(e){
            console.log(e)
        }
    }

  return (
    <div className="signup h-screen w-full">
      <div className="signup-popup">
        <h2>Join Medium.</h2>

        <div className="input-fields">
            <LabelledInput name="Your Name" placeholder="" type={"text"} onChange={(e)=>{
                setSignupInput({
                    ...signupInputField,
                     name: e.target.value
                })
            }} />
            <LabelledInput name="Your Email" placeholder="" type={"text"} onChange={(e)=>{
                setSignupInput({
                    ...signupInputField,
                     email: e.target.value
                })
            }} />
            <LabelledInput name="Your Password" placeholder="" type={"password"} onChange={(e)=>{
                setSignupInput({
                    ...signupInputField,
                     password: e.target.value
                })
            }} />

            <button onClick={signupBtn}>
                Continue
            </button>

            <p>
                Already have an account?
                <Link to='/signin'>Signin</Link>
            </p>
        </div>

        <div className="text">
          <p>
            Click “Sign up” to agree to Medium’s Terms of Service and
            acknowledge that Medium’s Privacy Policy applies to you.
          </p>
        </div>
      </div>
    </div>
  );
};

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