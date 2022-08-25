import React, { useEffect, useState } from "react";
import Navigate from '../Navigate';
import  search  from '../../images/search.png'
import { Button, Col, Container, Row, Table  } from 'react-bootstrap';
import { decodeToken, getToken, jsonToXml, LocalDate } from '../../utils/Common';
import { userStatus, userType } from "../../utils/Const";
import { GetAllItems, GetAllUsers, GetUserPending } from "../../utils/Api";
import './index.css'
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

    const [userData, setUserData] = useState([])
    const [maxUsers, setMaxUsers] = useState()
    const [userPending, getUserPending] = useState()
    const [itemData, setItemData] = useState([])

    const [formattedToday, getDate] = useState('')

    async function HandleUsers(){
        GetAllUsers()
        .then((res)=>{
            setUserData(res)
            setMaxUsers(res.length)
        })
        GetUserPending()
        .then((res)=>getUserPending(res.length))

        getDate ( LocalDate() )
    }

    async function HandleDownload(exportType){
        GetAllItems()
        .then((res)=>{
            setItemData(res)
        })
        console.log(typeof itemData)
        jsonToXml(itemData, exportType)
    }

    useEffect(()=> {
        if (getToken() === null)
            window.location.href = '/'
        

        const decodedToken = decodeToken()
        if(decodedToken.userType === userType.User)
            window.location.href = '/'

        HandleUsers()
    }, [])

    return (
        <div className='admin-dashboard'>
            <Navigate/>
            <div className="statistics">
                <Container fluid="true">
                    <Row>
                        <Col xs="auto" id="col-1">
                            <h6 ><b>Users Registered:</b></h6>
                            <h3><b>{maxUsers}</b></h3>
                            <h6 id="date">Till {formattedToday}</h6>
                        </Col>
                        <Col xs="auto" id="col-2">
                            <h6 ><b>Users Pending:</b></h6>
                            <h3><b>{userPending}</b></h3>
                            <h6 id="date">Till {formattedToday}</h6>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="line" />
            <h4 className="table-title">Users </h4>
            <Table size="sm" hover={true} bordered={true} striped="columns" className="users-table">
                <thead className="table-titles">
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Status </th>
                    <th>Preview </th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((data)=>{
                        return <TableRow userId={data.userId} firstname={data.firstname} lastname={data.lastname} username={data.username} userStatus={data.userStatus}/>
                    })}
                </tbody>
            </Table>
            <br/>
            <h5>Download all item information:</h5>
            <br/>
            <Row className="download-info"> 
                <Col Col xs="auto">
                    <Button onClick={()=>{HandleDownload('xml')}} className='download-button' variant="primary">XML</Button>
                </Col>
                <Col Col xs="auto">
                    <Button onClick={()=>{HandleDownload('json')}} className='download-button' variant="primary">JSON</Button>
                </Col>
            </Row>
        </div>
    );
}


function TableRow(props){
   
    let navigate = useNavigate(); 
    
    const routeChange = () =>{ 
        let path = `info/user/${props.userId}`; 
        navigate(path);
    }


    return (
        <tr>
            <td>{props.userId}</td>
            <td>{props.firstname}</td>
            <td>{props.lastname}</td>
            <td>{props.username}</td>
            { props.userStatus === userStatus.Pending &&
                (
                    <td style={{"color": "white", "backgroundColor" : "#b88333"}}>{props.userStatus}</td>
                )
            }
            {
                props.userStatus === userStatus.Accept &&
                (
                    <td style={{"color": "white", "backgroundColor" : "#33b88e"}}>{props.userStatus}</td>
                )
            }
            {
                props.userStatus === userStatus.Decline &&
                (
                    <td style={{"color": "white", "backgroundColor" : "#b83c33"}}>{props.userStatus}</td>
                )
            }
            <td> <button onClick={routeChange} className="preview-btn"> <img src={search} alt="search-img" height={15} width={15}/> </button></td>
        </tr>
    );
}