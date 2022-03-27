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
    <Form className="myForm" onSubmit={onLogin}>
        <h2>Login</h2>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
    </Form>
    );
}