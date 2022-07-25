import React , { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { HandleLogin } from "../../utils/FetchMethods";
import "./index.css"
import { BASE_URL, POST_USER_URL } from "../../utils/Path";

export default function Login(){
    
    const [inputEmail, setEmail] = useState()
    const [inputPassword, setPassword] = useState()

    const body = {
        email: inputEmail,
        password: inputPassword
    }
    async function OnLogin(event){
        event.preventDefault()
        await HandleLogin(BASE_URL + POST_USER_URL.Login, body)
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
                <Form.Label column="sm"><strong>Username</strong></Form.Label>
                <Form.Control size="sm" type="username" placeholder="username" value={inputEmail} onChange={(e)=>setEmail(e.target.value)}/>
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
    </div>
    );
}