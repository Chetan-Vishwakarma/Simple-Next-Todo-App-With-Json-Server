import { Breadcrumbs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function CustomBreadCrumbs({ tabs }) {
    return (
        <div role="presentation" className='mb-2 mb-3'>
            <Breadcrumbs aria-label="breadcrumb">
                {tabs.length > 0 && tabs.slice(0, tabs.length - 1).map(itm => (
                    <Link underline="hover" color="inherit" to={itm.tabLink}>
                        {itm.tabName}
                    </Link>
                ))}
                <Typography color="text.primary">{tabs.length > 0 && tabs[tabs.length - 1].tabName}</Typography>
                {/* <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Clients
                    </Link>
                    <Typography color="text.primary">Client Details</Typography> */}
            </Breadcrumbs>
        </div>
    )
}

export default CustomBreadCrumbs
