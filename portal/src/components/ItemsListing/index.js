import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ItemInfoView } from '../ItemInfoView';
import Navigate from '../Navigate';
import './index.css'
import React, { useState } from 'react';
import CustomBreadcrumb from '../CustomBreadcrumb';
import { mockItemInfo } from '../../utils/Mocks';

export default function ItemsListing() {

    const [infoData] = useState(mockItemInfo)

    return (
        <div>
            <Navigate/>
            <CustomBreadcrumb value='Products'/>
            <div className='grid-box'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid container item spacing={1}>
                            {infoData.map((data)=>{
                                return <ItemComponenet itemId={data.itemId} img={data.img} title={data.title} price={data.price}/>
                            })}
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
}

function ItemComponenet(props){

    return(
        <Grid item xs={2}>
            <ItemInfoView itemId={props.itemId} img={props.img} title={props.title} price={props.price}/>
        </Grid>
    );

}