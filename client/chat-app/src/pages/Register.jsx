import React,{useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { registerRoute } from "../utils/APIRoutes"
const Register = () => {
    const [user, setUser] = useState({
        "username":"",
        "email":"",
        "password":"",
        "confirmPassword":""
    })
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("chat-app-user")) {
            navigate("/")
        }
    },[])
    const toastOptions = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }
    const handleValidation = () => {
        const {username,email,password,confirmPassword} = user
        if(username.length<3) {
            toast.error("username must be 3 ",toastOptions)
            return false
        }
        if(email === "") {
            toast.error("email is require ",toastOptions)
            return false
        }
        if(password.length<8) {
            toast.error("length password must be 8 ",toastOptions)
            return false
        }
        if(password !== confirmPassword) {
            toast.error("password and confirm password must be same",toastOptions)
            return false
        }
       
       
        
        return true
    }
    const handleSubmit = async(event) => {
        event.preventDefault()
        if(handleValidation()) {
            const {username,email,password,confirmPassword} = user
            const {data} = await axios.post(registerRoute,{
                username,email,password
            })
            if(!data.status) {
                toast.error(data.msg,toastOptions)
            } else {
                localStorage.setItem("chat-app-user",JSON.stringify(data.user))
                navigate("/")
            }
        }
    }
    const handleChange = (event) => {
        setUser({...user,[event.target.name]:event.target.value})
    }

    return(
        <>
        <FromContainer>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt=""/>
                    <h1>Snappy</h1>
                </div>
                <input 
                    type="text"
                    placeholder="User Name"
                    name="username"
                    onChange={(e)=>handleChange(e)}
                    />
                <input 
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e)=>handleChange(e)}
                    />

                    <input 
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={(e)=>handleChange(e)}
                    />

                    <input 
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={(e)=>handleChange(e)}
                    />
                    <button type="submit">Create User</button>
                    <span>ready have an account ? <Link to='/login'>Login</Link></span>
                    
            </form>
        </FromContainer>
        <ToastContainer/>
        </>
    )
}
const FromContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1rem;
background-color: #131324;
.brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img{
        height: 5rem;
}
    h1{
        color: white;
        text-transform: uppercase;
}
}
form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
            border: 0.1rem solid #997af0;
            outline: none;
    }
    }
    button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #7c6ea5;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
}
`
export default Register