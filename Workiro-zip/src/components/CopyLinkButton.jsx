import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <button onClick={handleClick}>Copy Link</button>
      <ToastContainer />
    </>
  );
};

export default CopyLinkButton;
