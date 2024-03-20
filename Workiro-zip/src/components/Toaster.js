import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function Toaster() {
  return (
    <Stack className='' spacing={2}>
      <Alert severity="success" className='text-start custom-toaster'>
        <AlertTitle>Success</AlertTitle>
        This is a success Alert with an encouraging title.
      </Alert>
      {/* <Alert severity="info" className='text-start custom-toaster'>
        <AlertTitle>Info</AlertTitle>
        This is an info Alert with an informative title.
      </Alert>
      <Alert severity="warning" className='text-start custom-toaster'>
        <AlertTitle>Warning</AlertTitle>
        This is a warning Alert with a cautious title.
      </Alert>
      <Alert severity="error" className='text-start custom-toaster'>
        <AlertTitle>Error</AlertTitle>
        This is an error Alert with a scary title.
      </Alert> */}
    </Stack>
  )
}

export default Toaster