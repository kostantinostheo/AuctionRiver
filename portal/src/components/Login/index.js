import React , { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { PostAsync } from "../../utils/Api";
import { getToken } from "../../utils/Common";
import { BASE_URL, POST_USER_URL } from "../../utils/Path";
import PopUp from "../PopUp";
import "./index.css"
import logo from '../../images/logo_dark.png'

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
        console.log(body)
        const res = await PostAsync(BASE_URL + POST_USER_URL.Login, body)
        console.log(res)
        
        if(res.status === 200){
            const data = await res.json()
            localStorage.setItem('token', data.token)   //save token as cookies 
            window.location.href = '/'
        }
        else if(res.status === 400){
            setLogs('Your email or password is invalid')
            handleShow()
        }

    }
    useEffect(()=> {
        if (getToken() != null) {
            window.location.href = '/'
        }
    }, [])
    return(
    <div>
        <a href="/">
            <img id="login-logo" src={logo} width="190" height="65" alt="Amazon"></img>
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
            <Button id="login-submit-btn" type="submit">Login</Button>
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