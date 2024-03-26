import { Box } from '@mui/material'
import React from 'react'
import noData from "../../src/images/no-data.gif";

function DataNotFound() {
    return (
        <Box className='text-center no-data-found'>
            <img src={noData} />
            <h4 className='font-18 text-gray'>Data Not Found</h4></Box>
    )
}

export default DataNotFound
