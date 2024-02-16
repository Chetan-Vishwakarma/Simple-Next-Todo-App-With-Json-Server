import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/reducers/counterSlice";
import { Box, Typography } from '@mui/material';
import user from "../images/user.jpg";
import pin from "../images/icons/star.svg";




function Home() {
  const data = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <Box className='container'>
      <Box className='row'>
        <Box className='col-lg-11 m-auto'>
          <Box className='row'>
            <Box className='col-lg-3'>
              <Box className='client-box'>
                <img src={pin} className='pin-img' />
                <Box className='client-img'>
                  <img src={user} />
                </Box>
                <Typography variant="h2">Patrick Jo.</Typography>
                <Typography variant='h4'>Admin</Typography>
                <Typography variant='p' className='mb-0'>patrick_joe@yahoo.com</Typography>
                <Box className='color-filter-box mt-3'>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                </Box>
              </Box>
            </Box>
            {/* col box end */}

            <Box className='col-lg-3'>
              <Box className='client-box'>
                <Box className='client-img'>
                  <img src={user} />
                </Box>
                <Typography variant="h2">Patrick Jo.</Typography>
                <Typography variant='h4'>Admin</Typography>
                <Typography variant='p' className='mb-0'>patrick_joe@yahoo.com</Typography>
                <Box className='color-filter-box mt-3'>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                </Box>
              </Box>
            </Box>
            {/* col box end */}

            <Box className='col-lg-3'>
              <Box className='client-box'>
                <Box className='client-img'>
                  <img src={user} />
                </Box>
                <Typography variant="h2">Patrick Jo.</Typography>
                <Typography variant='h4'>Admin</Typography>
                <Typography variant='p' className='mb-0'>patrick_joe@yahoo.com</Typography>
                <Box className='color-filter-box mt-3'>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                </Box>
              </Box>
            </Box>
            {/* col box end */}

            <Box className='col-lg-3'>
              <Box className='client-box'>
                <Box className='client-img'>
                  <img src={user} />
                </Box>
                <Typography variant="h2">Patrick Jo.</Typography>
                <Typography variant='h4'>Admin</Typography>
                <Typography variant='p' className='mb-0'>patrick_joe@yahoo.com</Typography>
                <Box className='color-filter-box mt-3'>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                </Box>
              </Box>
            </Box>
            {/* col box end */}

            
            <Box className='col-lg-3'>
              <Box className='client-box'>
                <Box className='client-img'>
                  <img src={user} />
                </Box>
                <Typography variant="h2">Patrick Jo.</Typography>
                <Typography variant='h4'>Admin</Typography>
                <Typography variant='p' className='mb-0'>patrick_joe@yahoo.com</Typography>
                <Box className='color-filter-box mt-3'>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                </Box>
              </Box>
            </Box>
            {/* col box end */}

            <Box className='col-lg-3'>
              <Box className='client-box'>
                <Box className='client-img'>
                  <img src={user} />
                </Box>
                <Typography variant="h2">Patrick Jo.</Typography>
                <Typography variant='h4'>Admin</Typography>
                <Typography variant='p' className='mb-0'>patrick_joe@yahoo.com</Typography>
                <Box className='color-filter-box mt-3'>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                </Box>
              </Box>
            </Box>
            {/* col box end */}

            
            <Box className='col-lg-3'>
              <Box className='client-box'>
                <Box className='client-img'>
                  <img src={user} />
                </Box>
                <Typography variant="h2">Patrick Jo.</Typography>
                <Typography variant='h4'>Admin</Typography>
                <Typography variant='p' className='mb-0'>patrick_joe@yahoo.com</Typography>
                <Box className='color-filter-box mt-3'>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                </Box>
              </Box>
            </Box>
            {/* col box end */}

            <Box className='col-lg-3'>
              <Box className='client-box'>
                <Box className='client-img'>
                  <img src={user} />
                </Box>
                <Typography variant="h2">Patrick Jo.</Typography>
                <Typography variant='h4'>Admin</Typography>
                <Typography variant='p' className='mb-0'>patrick_joe@yahoo.com</Typography>
                <Box className='color-filter-box mt-3'>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                  <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                </Box>
              </Box>
            </Box>
            {/* col box end */}


          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
