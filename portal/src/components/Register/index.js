import { useState , React, useEffect }  from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { PostAsync } from "../../utils/Api";
import { getToken } from "../../utils/Common";
import { BASE_URL, POST_USER_URL } from "../../utils/Path";
import PopUp from "../PopUp";
import logo from '../../images/logo_dark.png'
import "./index.css"

export default function Register(){

    //Pop Up Options
    const [show, setShow] = useState();
    const [logs, setLogs] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    //User Register Options
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordValid, setPasswordValid] = useState('')
    const [mobile, setMobile] = useState('')
    const [SSN, setSSN] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [zip, setZip] = useState('')
    const [city, setCity] = useState('')



    async function OnRegister(event){
        event.preventDefault()
        if(password === passwordValid)
        {
            const body = {
                firstname,
                lastname,
                username,
                email,
                password,
                mobile,
                SSN,
                address,
                country,
                zip,
                city
            }
            
            const res = await PostAsync(BASE_URL + POST_USER_URL.Register, body)
            
            if(res.status === 201){
                window.location.href = '/login'
            }
            else if (res.status === 409){
                setLogs('There is already a user with this email or username')
                handleShow()
            }
        }
        else{
            setLogs('Password Mismatch')
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
                <img id="register-logo" src={logo} width="190" height="65" alt="Amazon"></img>
            </a>

            <Form className="myForm" onSubmit={OnRegister}>
                <h3>Create account</h3>
                <br/>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formFirstName">
                        <Form.Label column="sm"><strong>First Name</strong></Form.Label>
                        <Form.Control size="sm" placeholder="First Name" value={firstname} onChange={(e)=>setFirstName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formLastName">
                        <Form.Label column="sm"><strong>Last Name</strong></Form.Label>
                        <Form.Control size="sm" placeholder="Last Name" value={lastname} onChange={(e)=>setLastName(e.target.value)}/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label column="sm"><strong>Username</strong></Form.Label>
                    <Form.Control size="sm" placeholder="Username" value={username} onChange={(e)=>setUserName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label column="sm"><strong>Email</strong></Form.Label>
                    <Form.Control size="sm" type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label column="sm"><strong>Password</strong></Form.Label>
                            <Form.Control size="sm" type="password" placeholder="At least 6 characters" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            <Form.Text id="passwordHelpBlock" muted>
                                Your password must be at least 6 characters.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formValPassword">
                            <Form.Label column="sm"><strong>Re-enter password</strong></Form.Label>
                            <Form.Control size="sm" type="password" value={passwordValid} onChange={(e)=>setPasswordValid(e.target.value)} required/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formMobile">
                        <Form.Label column="sm"><strong>Mobile number</strong></Form.Label>
                        <Form.Control size="sm" value={mobile} placeholder="Mobile number" onChange={(e)=>setMobile(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formSSN">
                        <Form.Label column="sm"><strong>Social Security Number</strong></Form.Label>
                        <Form.Control size="sm" value={SSN} placeholder="SSN" onChange={(e)=>setSSN(e.target.value)} required/>
                    </Form.Group>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label column="sm"><strong>Address</strong></Form.Label>
                            <Form.Control size="sm" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} required/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="formZip">
                            <Form.Label column="sm"><strong>Zip Code</strong></Form.Label>
                            <Form.Control size="sm" placeholder="Zip Code" value={zip} onChange={(e)=>setZip(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label column="sm"><strong>City</strong></Form.Label>
                            <Form.Control size="sm" placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} required/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="formCountry">
                            <Form.Label column="sm"><strong>Country</strong></Form.Label>
                            <Form.Control size="sm" placeholder="Country" value={country} onChange={(e)=>setCountry(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>

                <Button id="register-submit-btn" type="submit">
                    Create account
                </Button>
            </Form>

            <div class="already-registered">
                Already have an account? <a href="/login">Sign in</a>
            </div>

            <div class="footer-register">
                <hr></hr>
                <p class="copyright">2021-2022 © Auction River</p>
            </div>
            
            <PopUp show={show} header={"Register Failed"} logs={logs} onHide={handleClose}/>
        </div>
        );
}