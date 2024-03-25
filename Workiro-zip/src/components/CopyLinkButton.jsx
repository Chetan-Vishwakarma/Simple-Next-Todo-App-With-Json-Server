
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from '@mui/material';
const CopyLinkButton = ({ copyLink }) => {
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(copyLink);
      toast.success('Link copied to clipboard!', {
        autoClose: 2000
      });
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('Failed to copy link to clipboard!');
    }
  };

  return (
    <>
     <Box className='ps-1'>
     <button className='btn-blue-2' size="small" onClick={handleClick}>Copy Link</button>
     </Box>
     
      <ToastContainer />
    </>
  );
};

export default CopyLinkButton;
