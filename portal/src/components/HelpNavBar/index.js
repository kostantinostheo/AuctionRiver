import React  from 'react'
import { Dropdown, DropdownButton, Navbar} from 'react-bootstrap'
import './index.css'

export default function HelpNavBar(){

  return(
    <div className='custom-helpnav-bar'>
      <Navbar expand="lg">
      <DropdownButton
      id='dropdown-order'
      title="Order by"
    >
        <Dropdown.Item id='drop-item' eventKey="option-1">option-1</Dropdown.Item>
        <Dropdown.Item id='drop-item' eventKey="option-2">option-2</Dropdown.Item>
        <Dropdown.Item id='drop-item' eventKey="option-3">option 3</Dropdown.Item>
      </DropdownButton>
        <select >
            <option value="0">Best Match</option>
            <option value="1">Price Lowest-first</option>
            <option value="2">Price Highest-first</option>
        </select>    
        <button id='filter'>All Listing</button>
        <button id='filter'>Buy Now</button>
        <button id='filter'>Auction</button>
      </Navbar>
    </div>
  );
}
