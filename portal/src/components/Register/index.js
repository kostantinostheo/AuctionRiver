import React from "react";
import { Button, Form, Row, Col} from "react-bootstrap";
import "./index.css"

export default function Register(){
    return(
        <div>
            <a href="/">
                <img src="https://images-na.ssl-images-amazon.com/images/G/01/social_share/amazon_logo._CB635397845_.png" width="220" height="133" alt="Amazon"></img>
            </a>

            <Form className="myForm">
                <h3>Create account</h3>
                <br/>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formFirstName">
                        <Form.Label column="sm"><strong>First Name</strong></Form.Label>
                        <Form.Control size="sm" placeholder="First Name"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formLastName">
                        <Form.Label column="sm"><strong>Last Name</strong></Form.Label>
                        <Form.Control size="sm" placeholder="Last Name"/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label column="sm"><strong>Username</strong></Form.Label>
                    <Form.Control size="sm" placeholder="username"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label column="sm"><strong>Email</strong></Form.Label>
                    <Form.Control size="sm" type="email" placeholder="name@example.com"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label column="sm"><strong>Password</strong></Form.Label>
                    <Form.Control size="sm" type="password" placeholder="At least 6 characters"/>
                    <Form.Text id="passwordHelpBlock" muted>
                        Your password must be at least 6 characters.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formValPassword">
                    <Form.Label column="sm"><strong>Re-enter password</strong></Form.Label>
                    <Form.Control size="sm" type="password"/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formMobile">
                        <Form.Label column="sm"><strong>Mobile number</strong></Form.Label>
                        <Form.Control size="sm"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formSSN">
                        <Form.Label column="sm"><strong>Social Security Number</strong></Form.Label>
                        <Form.Control size="sm"/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formCountry">
                        <Form.Label column="sm"><strong>Country</strong></Form.Label>
                        <Form.Control size="sm"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formCountry">
                        <Form.Label column="sm"><strong>City</strong></Form.Label>
                        <Form.Control size="sm"/>
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Create account
                </Button>
            </Form>

            <div class="already-registered">
                Already have an account? <a href="/login">Sign in</a>
            </div>

            <div class="footer-register">
                <hr></hr>
                <p class="copyright">2021-2022 © Company Name</p>
            </div>
        </div>
        );
}