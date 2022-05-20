import React from 'react'
import ApartmentIcon from '@mui/icons-material/Apartment';
import StoreIcon from '@mui/icons-material/Store';

export default function MerchantCategoryIcon(props) {
    const {merchantCategory} = props
    const ico = {
        'perusahaan' : <ApartmentIcon/>,
        'individual' : <StoreIcon/>    
    }
    return ico[merchantCategory]
}
