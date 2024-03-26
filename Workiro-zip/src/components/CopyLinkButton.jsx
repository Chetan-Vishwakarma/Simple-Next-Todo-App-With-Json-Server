
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from '@mui/material';
import { Button } from 'devextreme-react';
import CopyAllIcon from '@mui/icons-material/CopyAll';

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
    
        <Button className='btn-blue-2 btn-padding-same ms-2' size="small" onClick={handleClick}><CopyAllIcon /> Copy Link</Button>

      <ToastContainer />
    </>
  );
};

export default CopyLinkButton;
