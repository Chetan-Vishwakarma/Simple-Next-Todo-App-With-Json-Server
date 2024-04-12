import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, TextField, Autocomplete } from '@mui/material';

const agrno = localStorage.getItem("agrno");
const Email = localStorage.getItem("Email");
const password = localStorage.getItem("Password");
const folderId = localStorage.getItem("FolderId");

function DocumentRenameModal({ ClsSms, openRenameModal, setOpenRenameModal, docForDetails, Json_getRecentDocumentList }) {
    const handleClose = () => setOpenRenameModal(false);
    const [description,setDescription] = useState( docForDetails.Subject ? docForDetails.Subject : "" );
    console.log("erowruisdk",description);
    const Json_RenameDocument = () => {
        let obj = {
            agrno: agrno,
            Email: Email,
            password: password,
            ItemId: docForDetails.ItemId ? docForDetails.ItemId : "",
            Description: description,
            FolderId: folderId
        };
        ClsSms.Json_RenameDocument(obj, (sts, data) => {
            if (sts) {
                if (data) {
                    let json = JSON.parse(data);
                    console.log("Json_RenameDocument", json);
                    if(json.Status==="Success"){
                        Json_getRecentDocumentList();
                        toast.success(json.Message);
                    }else{
                        toast.error("Unable to rename this document");
                    }
                    handleClose();
                }
            }
        });
    }
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
                        {/* <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField onChange={(e)=>setDiscription(e.target.value)} {...params} label="Movie" />}
                        /> */}
                        <TextField value={description} onChange={(e)=>setDescription(e.target.value)} label="Description" />
                        <Button onClick={Json_RenameDocument}>Submit</Button>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </>
    )
}
const top100Films = [
    { label: 'General Letter', year: 1994 },
    { label: 'Test Letter', year: 1974 },
    { label: 'Test Assignment', year: 2008 },
    { label: 'Tester Document', year: 1957 }
  ];

export default DocumentRenameModal
