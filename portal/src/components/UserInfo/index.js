import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
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
            <h3 className="title-header">Personal Information</h3>
            <h5 className="username-header">{data.firstname} &nbsp; {data.lastname}</h5>
            <h6 className="username-sub-header">@{data.username}</h6>            
                <Table  bordered hover>
                    <tbody>
                        <tr>
                            <th id="table-info">Status: </th>
                            { data.userStatus === userStatus.Accept &&
                                <td id="table-info">Active ✅</td>
                            }
                            { data.userStatus === userStatus.Decline &&
                                <td id="table-info">Rejected 🚫</td>
                            }
                            { data.userStatus === userStatus.Pending &&
                                <td id="table-info">Pending ⌛</td>
                            }
                        </tr>
                        <tr>
                            <th id="table-info">Address: </th>
                            <td id="table-info">{data.address}, {data.zip}, {data.country}</td>
                        </tr>
                        <tr>
                            <th id="table-info">Email: </th>
                            <td id="table-info">{data.email}</td>
                        </tr>
                        <tr>
                            <th id="table-info">Mobile: </th>
                            <td id="table-info">{data.mobile}</td>
                        </tr>
                        <tr>
                            <th id="table-info">Rating: </th>
                            <td id="table-info">{data.rating}⭐</td>
                        </tr>
                    </tbody>
                </Table>
    </div>
  );
}