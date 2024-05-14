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
import { BACKEND_URL } from '../config';

interface Write{
    isWriting?: boolean;
}
export const LoginNavbar = ({isWriting}:Write) => {

    const navigate = useNavigate();
    const [openProfilePopup, setProfilePopup] = useState(false);
    const [name,setName] = useState("??");
    const userName = name.split('');
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate('/signin');
        }
        const getUserData = async () => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/user`,{
                headers: {
                    Authorization: `${token}`
                }
            });
            if(response){
                setLoading(false);
            }
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

    if(loading){
        return (
            <>
            <div className="login-navbar">
                <div className="login-left">
                    <Link className='skeleton skeleton-text skeleton-text__body' to="/"><img src="" alt="" />DSADAS</Link>
                    <div className='search skeleton skeleton-text skeleton-text__body'>
                        dsadasdasdasd
                    </div>
                </div>
                <div className="login-right">
                    {isWriting ? "" : (
                        <>
                        <div className="write skeleton skeleton-text skeleton-text__body">
                            dsadasd
                        </div>
                        <div className="notification skeleton skeleton-text skeleton-text__body">
                            dsad
                        </div>
                    </>
                    )}
                    <div onClick={()=>{setProfilePopup(!openProfilePopup)}} className="profile skeleton skeleton-text skeleton-text__body">
                        dsadasd
                    </div>
                </div>
            </div>
        </>
        )
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
                    {isWriting ? "" : (
                        <>
                        <div className="write">
                            <Link to={"/write"}>
                                <TfiPencilAlt/>
                                Write
                            </Link>
                        </div>
                        <div className="notification">
                        <IoNotificationsOutline />
                        </div>
                    </>
                    )}
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