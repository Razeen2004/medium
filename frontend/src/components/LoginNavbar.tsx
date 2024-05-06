import './LoginNavbar.css';
import logo from './assets/navlogo.png';
import { CiSearch } from "react-icons/ci";
import { TfiPencilAlt } from "react-icons/tfi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { PiBookmarksSimpleThin } from "react-icons/pi";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
export const LoginNavbar = () => {
    const navigate = useNavigate();
    const [openProfilePopup, setProfilePopup] = useState(false);
    const [name,setName] = useState("??");
    const userName = name.split('');
    const [userEmail, setUserEmail] = useState("");
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate('/signin');
        }
        const getUserData = async () => {
            const response = await axios.get("http://localhost:8787/api/v1/user",{
                headers: {
                    Authorization: `${token}`
                }
            });
            const userName = await response.data.user.name;
            setName(userName)
            const mail = response.data.user.email;

            function maskEmailSimple(email:any) {
                // Split the email address at the "@" symbol
                const parts = email.split("@");
                // Mask the middle characters of the username (leaving first and last)
                const maskedUsername = parts[0].replace(/^(.)(.)(.*)$/, function(match: string,$1:string, $2:string, $3:string) {
                  return $1 + "*".repeat($2.length) + $3;
                });
              
                // Combine masked username with domain
                return maskedUsername + "@" + parts[1];
            }
            const changedEmail = maskEmailSimple(mail)
            setUserEmail(changedEmail)
        }
        getUserData()
    },[name])
    const signout = () => {
        localStorage.removeItem("token");
        navigate('/');
    }

    return(
        <>
            <div className="login-navbar">
                <div className="login-left">
                    <Link to="/"><img src={logo} alt="" /></Link>
                    <div className='search'>
                        <CiSearch/><input type="text" placeholder='Search' />
                    </div>
                </div>
                <div className="login-right">
                    <div className="write">
                        <TfiPencilAlt/>
                        Write
                    </div>
                    <div className="notification">
                    <IoNotificationsOutline />
                    </div>
                    <div onClick={()=>{setProfilePopup(!openProfilePopup)}} className="profile">
                        {userName[0]}
                        {userName[1]}
                    </div>
                </div>
            </div>
            {openProfilePopup && (
                <>
                <div onClick={()=>{setProfilePopup(!openProfilePopup)}} className="overlay"></div>
                <div className="profile-popup">
                    <ul>
                        <li><FiUser /> Profile</li>
                        <li><PiBookmarksSimpleThin /> Library</li>
                        <li>Settings</li>
                        <li>Help</li>
                        <li onClick={signout}>Signout <br />
                        {userEmail}</li>
                    </ul>
                </div>
                </>
            )}
        </>
    )
}