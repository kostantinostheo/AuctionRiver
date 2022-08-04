import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import './index.css'
export default function UserInfo() {
  return (
    <div>
        <Container>
            <Row xs="auto">
                <Col>
                    <h3 className="username-header">Konstantinos</h3>
                </Col>
                <Col>
                    <h3 className="username-header">Theofilis</h3>
                </Col>
            </Row>
            <h5 className="username-header">kontheo</h5>
            <br/>
            <Row xs="auto">
                <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" height={20} width={20} alt=''/>
                <div className="sub-header">Paraskeva 32, Kifisia, 12031</div>
            </Row>
            <br/>
            <Row xs="auto">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Globe_icon.svg/1200px-Globe_icon.svg.png" height={20} width={20} alt=''/>
                <div className="sub-header">Greece</div>
            </Row>
            <br/>
            <Row xs="auto">
                <img src="https://cdn-icons-png.flaticon.com/512/65/65680.png" height={20} width={20} alt=''/>
                <div className="sub-header">6905023142</div>
            </Row>
        </Container>
    </div>
  );
}