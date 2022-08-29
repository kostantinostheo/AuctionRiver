import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { GetSellerItems } from '../../utils/Api';
import { decodeToken } from '../../utils/Common';
import edit from '../../images/edit.png'

import './index.css'

export default function CardListing() {

  const [sellerItems, setSellerItems] = useState([])

  async function FetchSellerItems(){
    const sellerId = decodeToken().userId
    GetSellerItems(sellerId)
    .then((res)=>{setSellerItems(res)})
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
              <td><button id='edit-button'><img src={edit} /></button></td>
              </tr>
            </>
          })
        }
      </tbody>
    </Table>
    </div>
  );
}