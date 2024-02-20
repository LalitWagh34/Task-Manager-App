
import { useState,useEffect } from "react";
import React from "react";
import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg"
import {ToastContainer , toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import {loginRouter} from "../utils/ApiRoutes"

function Login(){
    const navigate = useNavigate()
    const[value ,setValue] = useState({
        username:"",
        password:"",
        
    })
    const toastOptions ={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }
    useEffect(()=>{
        if (localStorage.getItem('chat-app-user')){
            navigate("/")
        }
    },[])
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            const {password , username  } = value;
                const {data} = await axios.post(loginRouter , {
                    username, 
                    password,
                    
                });
                if (data.status === false){
                    toast.error(data.msg , toastOptions)
                }
                if (data.status == true){
                    localStorage.setItem('chat-app-user' , JSON.stringify(data.user))
            navigate("/");

                }
            }

        };
    const handleValidation = () =>{
        const {password  , username } = value;
            if (password === ""){
                toast.error("Email and Password is required. ", toastOptions
                );
                return false;
            }
            else if (username === ""){
                toast.error("Email and Password is required" , toastOptions);
                return false;
            }
            

            return true;
        }
    const handleChange =(event) =>{
        setValue({...value,[event.target.name]:event.target.value});
    };


    return (
        <>
            <FormContainer>
                <form onSubmit={(event) =>handleSubmit(event) }>
                    <div className="brand">
                        <img src={Logo} alt="Logo"/>
                      
                    </div>
                    <input type="text" 
                    placeholder="Username" 
                    name="username"
                    min="3" 
                    onChange={(e) => handleChange(e)}>
                    </input>
                   
                     <input 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        onChange={(e) => handleChange(e)}>
                    </input>
                  
                    <button type="submit"> Login </button>
                    <span>
                        Don't have an account? <Link to="/Register">Register</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        
        </>
    )
}
const FormContainer = styled.div`
    height:100vh;
    width:100vw;

    display:flex;
    flex-direction:column;
    justify-content: center;
    gap:1rem;
    align-items:center;
    background-color:#3A1078;
    .brand{
        display:flex;
        align-items:center;
        gap:1rem;
        justify-content:center;
        img{
            height:4rem;
        }
        h1{
            color:#fff;
            text-transform:uppercase;
        }
    }
    form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        background-color:#2A0944;
        padding:3rem 5rem;
        border-radius:2rem;
        input{
            background-color:transparent;
            padding:1rem;
            border:0.1rem solid #4e0eff;
            border-radius:0.4rem;
            color:white;
            width:350px;
            font-size:1rem;
            &:focus{
                border:0.1rem solid #997af0;
                outline:none;
            }
        }
        button{
            background-color:#997af0;
            color:white;
            padding:1rem 2rem;
            border:none;
            font-weight:bold;
            cursor:pointer;
            border-radius:0.4rem;
            text-transform:uppercase;
            transition:0.5s ease-in-out;
            &:hover{
                background-color:#4e0eff;
            }
        }
        span{
            color:white;
            display:flex;
            justify-content:center;
            text-transform:uppercase;
            a{
                color:#4e0eff;
                text-decoration:none;
                font-weight:bold;
            }
        }
    }


`;
export default Login;