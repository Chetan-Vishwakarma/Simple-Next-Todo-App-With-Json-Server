import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function DocumentRenameModal({ ClsSms, openRenameModal, setOpenRenameModal }) {
    const handleClose = () => setOpenRenameModal(false);

    //   useEffect()
    return (
        <>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            {/* <Modal
                open={openRenameModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal> */}

            <Dialog
                open={openRenameModal}
                onClose={(event) => handleClose(event)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='custom-modal'
                sx={{
                    maxWidth: 640,
                    margin: '0 auto'
                }}
            >
                <Box className="d-flex align-items-center justify-content-between modal-head">
                    <Box className="dropdown-box">
                        <Typography variant="h4" className='font-18 bold mb-0 text-black'>
                            Rename Document
                        </Typography>
                    </Box>

                    {/*  */}
                    <Button onClick={(event) => handleClose(event)} autoFocus sx={{ minWidth: 30 }}>
                        <span className="material-symbols-outlined text-black">
                            cancel
                        </span>
                    </Button>
                </Box>
                <DialogContent>
                    <DialogContentText>
                        <h1>Hello Docusoft</h1>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default DocumentRenameModal
