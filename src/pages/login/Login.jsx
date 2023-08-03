import React, { useContext, useState } from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import { userRequest } from '../../apicall'
import { taskContext } from '../../helpers/TaskProvider'


const Login = () => {

const [error,setError] = useState("")
const navigate = useNavigate();
const {setUserId} = useContext(taskContext);

const handleSubmit = async(e)=>{

  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;


  await userRequest.post("auth/login",{email,password}).then((res)=>{

    //i am currently storing the user in the local storage
    localStorage.setItem('user', JSON.stringify({id:res.data.id}))
   setUserId((prev)=>res.data.id)
   setError("");
   navigate("/");

  }).catch((err)=>{
    setError(err?.response?.data);
  })


 }


  
  return (
    <div className='login_container'>

    <form className="loginform" onSubmit={handleSubmit}>
       <p className="form-title">Login to your account</p>
        <div className="input-container">
          <input type="email" placeholder="Enter email" required  maxLength={100}/>
          <span>
          </span>
      </div>
      <div className="input-container">
          <input type="password" placeholder="Enter password" required minLength={8}/>
        </div>
        {
          error && <p style={{color:"red"}}>{error}</p>
        }

         <button type="submit" className="submitform">
            Login
         </button>

      <p className="signup-link">
        No account?
        <Link to={"/register"}>Sign up</Link>
      </p>
   </form>

    </div>
  )

 }


export default Login