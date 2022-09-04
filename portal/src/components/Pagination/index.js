import React from "react";
import { Button } from "react-bootstrap";
import './index.css'

export default function Pagenation({itemsPerPage, totalItems, paginate}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
       pageNumbers.push(i)        
    }
    return(
        <nav>
            <ul id="pagination-nav" className="pagination">
                {
                    pageNumbers.map(number => (
                        <li id="pagenation-item-id" key={number} className='page-item'>
                            <Button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </Button>
                        </li>
                    ))
                }
            </ul> 
        </nav>
    )
}