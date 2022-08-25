import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { GetUserData, PatchAsync } from '../../utils/Api';
import { decodeToken, jsonToXml } from '../../utils/Common';
import { userStatus, userType } from '../../utils/Const';
import { BASE_URL, PATCH_USER_URL } from '../../utils/Path';
import Navigate from '../Navigate';
import './index.css'

export default function UserPanel() {
    
    const [data, userData] = useState([])
    
    async function AcceptUser(e){
        e.preventDefault()
        const body = {
            userStatus: userStatus.Accept
        }
        const res = await PatchAsync(BASE_URL + PATCH_USER_URL.UpdateUserStatus + data.userId , body)
        console.log(res.status)
        window.location.reload()
    }
    async function DeclineUser(e){
        e.preventDefault()
        const body = {
            userStatus: userStatus.Decline,
        }
        const res = await PatchAsync(BASE_URL + PATCH_USER_URL.UpdateUserStatus + data.userId , body)
        console.log(res.status)
        window.location.reload()
    }

    async function HandleUserData(id){
        const res = await GetUserData(id)
        userData(res)
    }
    useEffect(()=> {
        const token = decodeToken()
        if(token && token.userType === userType.User)
            window.location.href = '/'
        //from the current path gets only the last part. User id.
        const lastItem = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        HandleUserData(lastItem)
    }, [])
    
    return (
        <div>
            <Navigate/>
            <div className="user-panel-form">
                <div className='user-panel-header'>
                    <h2> {data.firstname} {data.lastname} </h2>
                </div>
                <br/>
                <h5 id='sub-title'> <b> USER INFORMATION </b></h5>
                <br/>
                <div className='user-table'>
                    <table>
                        <tr>
                            <th>Username:</th>
                            &nbsp;
                            <td>{data.username}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            &nbsp;
                            <td>{data.email}</td>
                        </tr>
                        <tr>
                            <th>Status:</th>
                            &nbsp;
                            <td>{data.userStatus}</td>
                        </tr>
                        <tr>
                            <th>Phone/Mobile:</th>
                            &nbsp;
                            <td>{data.mobile}</td>
                        </tr>
                        <tr>
                            <th>Social Security Number:</th>
                            &nbsp;
                            <td>{data.SSN}</td>
                        </tr>
                        <tr>
                            <th>Address:</th>
                            &nbsp;
                            <td>{data.address}, {data.zip}, {data.country} </td>
                        </tr>
                    </table>
                </div>
                <br/>
                { data.userStatus === userStatus.Pending && 
                    (
                        <Row> 
                            <Col Col xs="auto">
                                <Button onClick={AcceptUser} variant="success"> Accept </Button>
                            </Col>
                            <Col Col xs="auto">
                                <Button onClick={DeclineUser} variant="danger"> Decline </Button>
                            </Col>
                        </Row>
                    )
                }
            </div>
        </div>
    );
}