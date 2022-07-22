import React , { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { decodeToken } from "../../utils/Common";
import "./index.css"

export default function Login(){
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


    async function onLogin(){
        const res = await fetch('http://localhost:3000/users/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        if(res.status === 400){
            alert('Invalid email or password. Please check again.')
        }
        const data = await res.json()
        if(data.token){
            localStorage.setItem('token', data.token)
            alert("Login Succesful")

            let _token = decodeToken(data.token)
            console.log(_token)
            console.log(data)

            window.location.href = '/'
        }
    }

    return(
    <div>
        <a href="/">
            <img src="https://images-na.ssl-images-amazon.com/images/G/01/social_share/amazon_logo._CB635397845_.png" width="220" height="133" alt="Amazon"></img>
        </a>

        <Form className="myForm" onSubmit={onLogin}>
            <h3>Sign-in</h3>
            <br/>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label column="sm"><strong>Username</strong></Form.Label>
                <Form.Control size="sm" type="username" placeholder="username" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label column="sm"><strong>Password</strong></Form.Label>
                <Form.Control size="sm" type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
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