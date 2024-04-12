
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from '@mui/material';
import { Button } from 'devextreme-react';
import CopyAllIcon from '@mui/icons-material/CopyAll';

const CopyLinkButton = ({ copyLink }) => {
  console.log("copyLink", copyLink)
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(copyLink);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('Failed to copy link to clipboard!');
    }
  };

  return (
    <>
      <span onClick={handleClick}> Copy Link</span>
      <ToastContainer  style={{ zIndex: "9999999" }}/>
    </>
  );
};

export default CopyLinkButton;
