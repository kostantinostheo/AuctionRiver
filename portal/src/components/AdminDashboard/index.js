import React, { useEffect, useState } from "react";
import Navigate from '../Navigate';
import  search  from '../../images/search.png'
import { Col, Container, Row, Table  } from 'react-bootstrap';
import { decodeToken, getToken, LocalDate } from '../../utils/Common';
import { userStatus, userType } from "../../utils/Const";
import { GetAllUsers, GetUserPending } from "../../utils/Api";
import './index.css'
import UserPanel from "../UserPanel";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

    const [show, setShow] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [userData, setUserData] = useState([])
    const [maxUsers, setMaxUsers] = useState()
    const [userPending, getUserPending] = useState()

    const [formattedToday, getDate] = useState('')

    async function HandleUsers(){
        const data = await GetAllUsers()
        const pending = await GetUserPending()

        setUserData(data)
        setMaxUsers(data.length)
        getUserPending(pending.length)

        getDate ( LocalDate() )
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
                        return <TableRow userId={data.userId} firstname={data.firstname} lastname={data.lastname} username={data.username} userStatus={data.userStatus} show={handleShow}/>
                    })}
                </tbody>
            </Table>
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