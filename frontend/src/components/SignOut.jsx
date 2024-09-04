import React from 'react'
import {useNavigate} from 'react-router-dom'
import { CiLogout } from "react-icons/ci";

function SignOut() {
    const navigate = useNavigate();
    function handleSignOut() {
        localStorage.removeItem('chatAppToken');
        navigate('/');
    }
  return (
   
       <button className="    text-slate-50 text-[22px] bg-slate-900 rounded-[50%] p-3  " onClick={handleSignOut}>
          <CiLogout/>
          </button>
  
  )
}

export default SignOut
