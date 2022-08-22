import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GetUserData } from "../../utils/Api";
import { decodeToken, getToken } from "../../utils/Common";
import { userStatus } from "../../utils/Const";
import './index.css'

export default function UserInfo() {

    const [data, getData] = useState([])

    async function HandleUserData(id){
        GetUserData(id)
        .then((res)=>getData(res))
    }

    useEffect(()=> {
        if (getToken() == null) {
            window.location.href = '/'
        }
        else{
            const token = decodeToken()
            HandleUserData(token.userId)
             console.log(data)
        }
    }, [])


  return (
    <div className='personal-info'>
        <Container>
            <Row xs="auto">
                <Col>
                    <h3 className="username-header">{data.firstname}</h3>
                </Col>
                <Col>
                    <h3 className="username-header">{data.lastname}</h3>
                </Col>
            </Row>
            <h5 className="username-sub-header">{data.username} { data.userStatus === userStatus.Pending && ("(" + data.userStatus + ")") }</h5>
            <br/>
            <div className="secondary-info">
                <Row xs="auto">
                    <h6><b>Address:</b> &nbsp; {data.address}, {data.zip}, {data.country} </h6>
                </Row>
                <Row xs="auto">
                    <h6><b>Email:</b> &nbsp; {data.email} </h6>
                </Row>
                <Row xs="auto">
                    <h6><b>Phone/Mobile:</b> &nbsp; {data.mobile} </h6>
                </Row>
                <Row xs="auto">
                    <h6><b>Social Scurity Number:</b> &nbsp; {data.SSN} </h6>
                </Row>
            </div>
        </Container>
    </div>
  );
}