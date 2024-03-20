import React from 'react'
import { Box, Typography } from '@mui/material';

function Card({ name, email, img }) {
    return (
        <Box className='col-lg-3'>
            <Box className='client-box'>
                {/* <img src={pin} className='pin-img' /> */}
                <Box className='client-img'>
                    <img src={img} />
                </Box>
                <Typography variant="h2">{name.substr(0, 12) + "."}</Typography>
                <Typography variant='h4'>Admin</Typography>
                <Typography variant='p' className='mb-0'>{email.substr(0, 22) + "."}</Typography>
                <Box className='color-filter-box mt-3'>
                    <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                    <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                    <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Card
