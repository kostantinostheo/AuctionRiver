import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Table } from 'react-bootstrap';
import { GetSellerItems } from '../../utils/Api';
import { decodeToken } from '../../utils/Common';
import edit from '../../images/edit.png'

import './index.css'

export default function CardListing() {

  const [sellerItems, setSellerItems] = useState([])
  const [date, getDate] = useState()


  async function FetchSellerItems(){
    const sellerId = decodeToken().userId
    GetSellerItems(sellerId)
    .then((res)=>{
      setSellerItems(res)  
      getDate(new Date(res.started))
    })
  }

  let navigate = useNavigate();
    
  const routeChange = (id) =>{ 
      let path = `auction/` + id; 
      navigate(path);
  }

  useEffect(()=>{
    FetchSellerItems()
  },[])
  return (
    <div>
    <h3 className="title-header">My Auctions</h3>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Category</th>
          <th>Starts</th>
          <th>Ends</th>
          <th>Preview/Edit</th>
        </tr>
      </thead>
      <tbody>
        {
          sellerItems.map((data)=>{
            return <>
              <tr>
              <td>{data.itemId}</td>
              <td>{data.name}</td>
              <td>{data.category}</td>
              <td>{data.started}</td>
              <td>{data.ends}</td>              
              <td>
                {
                  <button onClick={()=>{routeChange(data.itemId)}} id='edit-button'><img src={edit} /></button>
                }
              </td>
              </tr>
            </>
          })
        }
      </tbody>
    </Table>
    </div>
  );
}