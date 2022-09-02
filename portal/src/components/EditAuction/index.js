import './index.css'
import Navigate from '../Navigate';
import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { categoryType } from '../../utils/Const';
import { categoriesMock } from '../../utils/Mocks';
import { Col, Row } from 'react-bootstrap';
import { GetItemDetails } from '../../utils/Api';
import Multiselect from 'multiselect-react-dropdown';

export default function CreateAuction() {

    const [categories, setCategories] = useState(Object.keys(categoryType))

    const [value1, onChange1] = useState(new Date()); // Auction start date
    const [value2, onChange2] = useState(new Date()); // Auction end date
    const [value3, onChange3] = useState(new Date());
    const [value4, onChange4] = useState(new Date());
    const [selected, setSelected] = useState([]); // Category value
    const [name, setName] = useState(); 
    const [description, setDescription] = useState(); 
    const [buyPrice, setBuyPrice] = useState();
    const [minBid, setMinBid] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [isDisabled, setIsDisabled] = useState(true);
    const [ButtonName, setButtonName] = useState('Edit');
    const [itemData, setItemData] = useState([])
    const options = categoriesMock

    // <select disabled={isDisabled} defaultValue={itemData.category} onChange={handleChange} className='categories-dropdown'>
    //                 <option value={false}>Select a category</option>
    //                 {
    //                   categories.map((category) => {
    //                     return(<option id='cat-type' value={category}>{category}</option>) 
    //                   })
    //                 }
    //               </select>

    const handleEditClick = () => {
      setIsDisabled(!isDisabled)
      setButtonName('Save')
    };


    const handleCancelClick = () => {
      window.location.reload()
    };
    
    
    const handleSaveClick = () => {
      setIsDisabled(!isDisabled)
      setButtonName('Edit')
    };


    function onSelect(selectedList, selectedItem) {
      let list = []
      selectedList.forEach(function (item){
        const array = Object.values(item)
        if (!list.includes(array)){
          list.push(array[0])
        }
      })
      setSelected(list)
    }


    function onRemove(selectedList, selectedItem) {
      const index = selected.indexOf(selectedItem.name)
      if (index > -1){
        selected.splice(index, 1)
      }
    }


    async function HandleItemData(id){
      const res = await GetItemDetails(id)
      setItemData(res)

      // let date1 = res.started
      // let result1 = date1.replace('T',' ').replace('Z','')
      // let datetime1 = new Date(result1)
      // onChange1(datetime1)

      let date2 = res.ends
      let result2 = date2.replace('T',' ').replace('Z','')
      let datetime2 = new Date(result2)
      onChange2(datetime2)
    }


    const handleChange = event => {
      console.log(event.target.value);
      setSelected(event.target.value);
    };

    const minDate = new Date()
    const maxDate = new Date(minDate)
    maxDate.setDate(maxDate.getDate() + 15)

    //console.log(typeof new Date(value1))
    //console.log(typeof value1)

    useEffect(()=> {
      const itemID = '1'

      HandleItemData(itemID)
    }, [])

    return (
      <div className='create-auction'>
        <Navigate/>
        <form className='main-content-auction'>
          <h3 id='auction-header'><b>Auction preview</b></h3>
          <div className='auction-details'>
            <h5><b>Auction details</b></h5>
            <div className='auction-row-first'>
              <h6 id='auction-row-title'><strong>*</strong>Item Title</h6>
              <div className='name-input-div'>
                <input disabled={isDisabled} placeholder='Title here' id='name-input' type="text" maxLength="90" defaultValue={itemData.name} onChange={(e)=>setName(e.target.value)} required></input>
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'><strong>*</strong>Category</h6>
              <div className='name-input-div'>
                <div className='categories-div'>
                <Multiselect
                  options={options} // Options to display in the dropdown
                  onSelect={onSelect}
                  onRemove={onRemove}
                  placeholder="Select a Category"
                  displayValue="name" // Property name to display in the dropdown options
                />
                </div>
              </div>
            </div>
            <div className='auction-row'>
              <h6 id='auction-row-title'><strong>*</strong>Item Description</h6>
              <div className='name-input-div'>
                <textarea disabled={isDisabled} id='description-text' maxLength="200" defaultValue={itemData.description} onChange={(e)=>setDescription(e.target.value)} required/>
              </div>
            </div>
            <Row> 
                <Col>
                  <div className='auction-row'>
                    <h6 id='auction-row-title'>Buy Now Price</h6>
                    <div className='name-input-div'>
                      <input disabled={isDisabled} placeholder='Buy now price' id='col-input' type="number" maxLength="90" defaultValue={itemData.buyPrice} onChange={(e)=>setBuyPrice(e.target.value)}/>
                      &emsp;<b>$</b>
                    </div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className='auction-row'>
                    <h6 id='auction-row-title'><strong>*</strong>Minimum Bid</h6>
                    <div className='name-input-div'>
                      <input disabled={isDisabled} placeholder='Bid to start' id='col-input' type="number" maxLength="90" defaultValue={itemData.firstBid} onChange={(e)=>setMinBid(e.target.value)} required/>
                      &emsp;<b>$</b>
                    </div>
                  </div>
                </Col>
            </Row>
            <Row> 
                <Col>
                  <div className='auction-row'>
                    <h6 id='auction-row-title'><strong>*</strong>Country</h6>
                    <div className='name-input-div'>
                      <input disabled={isDisabled} placeholder='Set Country' id='col-input' type="text" maxLength="90" defaultValue={itemData.country} onChange={(e)=>setCountry(e.target.value)} required/>
                    </div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className='auction-row'>
                    <h6 id='auction-row-title'><strong>*</strong>City</h6>
                    <div className='name-input-div'>
                      <input disabled={isDisabled} placeholder='Set City' id='location-input' type="text" maxLength="90" defaultValue={itemData.location} onChange={(e)=>setCity(e.target.value)} required/>
                    </div>
                  </div>
                </Col>
            </Row>
            <br/>
            <Row> 
                <Col>
                  <div className='auction-row-auction-starts'>
                    <h6 id='auction-row-title'><strong>*</strong>Auction Starts</h6>
                    <h6 id='current-start-date'>Current:</h6>
                    <div className='name-input-div'>
                      <DateTimePicker disabled={true} format="dd/MM/y h:mm a" clearIcon={null} disableClock="true"
                       onChange={onChange1} value={value1} />
                    </div>
                    <br/>
                    <h6 id='current-start-date'>New:</h6>
                    <div className='name-input-div'>
                      <DateTimePicker disabled={isDisabled} format="dd/MM/y h:mm a" clearIcon={null} disableClock="true" minDate={minDate}
                       maxDate={maxDate} onChange={onChange3} value={value3} />
                    </div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className='auction-row'>
                    <h6 id='auction-row-title'><strong>*</strong>Auction Ends</h6>
                    <h6 id='current-start-date'>Current:</h6>
                    <div className='name-input-div'>
                      <DateTimePicker disabled={true} format="dd/MM/y h:mm a" clearIcon={null} disableClock="true"
                       onChange={onChange2} value={value2} />
                    </div>
                    <br/>
                    <h6 id='current-start-date'>New:</h6>
                    <div className='name-input-div'>
                      <DateTimePicker disabled={isDisabled} format="dd/MM/y h:mm a" clearIcon={null} disableClock="true" minDate={minDate}
                      maxDate={maxDate} onChange={onChange4} value={value4} />
                    </div>
                  </div>
                </Col>
            </Row>
            <div className='auction-row-final'>
              <Row> 
                <Col Col xs="auto">
                  { ButtonName === 'Edit' &&
                      (
                        <button id='edit-button-id' className="edit-button" onClick={handleEditClick}>Edit</button>
                      )
                  }
                  { ButtonName === 'Save' &&
                      (
                        <button id='edit-button-id' className="edit-button" onClick={handleSaveClick}>Save</button>
                      )
                  }
                </Col>
                <Col Col xs="auto">
                  { ButtonName === 'Save' &&
                      (
                        <button id='cancel-button-id' className="cancel-button" onClick={handleCancelClick}>Cancel</button>
                      )
                  }
                </Col>
                <Col Col xs="auto">
                  <button id='delete-button-id' className="delete-button">Delete</button>
                </Col>
              </Row>
            </div>
          </div>
        </form>
      </div>
    )
}