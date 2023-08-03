import React, { useContext, useState } from "react";
import "./signin.css"
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../apicall";
import { taskContext } from "../../helpers/TaskProvider";


const Signin = () => {

const [error,setError] = useState("")
const [isLoading, setLoading] = useState(false); 
const navigate = useNavigate();
const {setUserId} = useContext(taskContext);



const handleSubmit = async(e)=>{

  e.preventDefault()
  const username = e.target[0].value;
  const email = e.target[1].value
  const password = e.target[2].value;


  // saving user details in mongodb
    const res = await userRequest.post("auth/register",{username,email,password}).then((res)=>{


      //i am currently storing the user in the local storage
      localStorage.setItem('user', JSON.stringify({id:res.data.id}))
      setUserId((prev)=>res.data.id)

       navigate("/");


  }).catch((err)=>{setError(err?.response?.data)});



}

  return (
    <div className="register_container">
      <div className="form-box">
        <form className="registerform" onSubmit={handleSubmit}>
          <span className="title">Sign up</span>
          <span className="subtitle">Create a free account with your email.</span>
         
          <div className="form-container">
            <input type="text" className="registerinput" placeholder="Username" required maxLength={100}/>
            <input type="email" className="registerinput" placeholder="Email" required maxLength={100}/>
            <input type="password" className="registerinput" placeholder="Password" required minLength={8}/>
          </div>

          <button type="submit">Sign up</button>
        </form>
        {
            error && <p style={{color:"red",textAlign:"center"}}>{error}</p>
        }
        <div className="form-section">
          <p>
            Have an account? <Link to={'/login'}>Log in</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
