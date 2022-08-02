import React , { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { PostAsync } from "../../utils/Api";
import { decodeToken } from "../../utils/Common";
import { userType } from "../../utils/Const";
import { BASE_URL, POST_USER_URL } from "../../utils/Path";
import PopUp from "../PopUp";
import "./index.css"

export default function Login(){
    
    //Pop Up Options
    const [show, setShow] = useState();
    const [logs, setLogs] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Login Settings
    const [inputField, setInput] = useState()
    const [inputPassword, setPassword] = useState()
    let body = null

    
    async function OnLogin(event){
        event.preventDefault()

        if (inputField.includes("@")) {
            body = {
                email: inputField,
                password: inputPassword
            }
        }
        else{
            body = {
                username: inputField,
                password: inputPassword
            }
        }

        const res = await PostAsync(BASE_URL + POST_USER_URL.Login, body)
        
        if(res.status === 400){
            setLogs('Your email or password is invalid')
            handleShow()
        }
        const data = await res.json()
        if(data.token){

            localStorage.setItem('token', data.token)   //save token as cookies 
            let decoded = decodeToken()
  
            if(decoded.userType === userType.User)
                window.location.href = '/'
            else
                window.location.href = '/register'

        }
        else{
            setLogs('Login failed')
            handleShow()
        }
    }

    return(
    <div>
        <a href="/">
            <img src="https://images-na.ssl-images-amazon.com/images/G/01/social_share/amazon_logo._CB635397845_.png" width="220" height="133" alt="Amazon"></img>
        </a>

        <Form className="myForm" onSubmit={OnLogin}>
            <h3>Sign-in</h3>
            <br/>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label column="sm"><strong>Email or Username</strong></Form.Label>
                <Form.Control size="sm" type="username" placeholder="email or username" value={inputField} onChange={(e)=>setInput(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label column="sm"><strong>Password</strong></Form.Label>
                <Form.Control size="sm" type="password" placeholder="password" value={inputPassword} onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">Login</Button>
        </Form>

        <div class="no-account">
            New to Company? <a href="/register">Create a new account</a>
        </div>

        <div class="footer-login">
            <hr></hr>
            <p class="copyright">2021-2022 © Company Name</p>
        </div>
        <PopUp show={show} header={"Login Failed"} logs={logs} onHide={handleClose}/>
    </div>
    );
}