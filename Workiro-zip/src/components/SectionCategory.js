import { Box, Button, Typography, Dialog, DialogContent, DialogContentText, Tabs, Tab, Checkbox, Menu, MenuItem, DialogActions, Grid, FormControlLabel, TextField, Autocomplete, RadioGroup, FormLabel, Radio, FormControl } from '@mui/material';
import { useEffect, useState } from 'react';
import CommanCLS from '../services/CommanService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
const SectionCategory = ({ Categoryopen, CategorysetOpen, selectedDocument }) => {

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
    let cls = new CommanCLS(baseUrl, agrno, Email, password);
    const AllCategory= useSelector((state) => state.counter.AllCategory);
    console.log("AllCategory",AllCategory);

    const CategoryhandleClose = () => {
        CategorysetOpen(false);
    };

    const [categorList, setCategory] = useState([]);
    const [categoryObj, setCategoryObj] = useState({});
    const [isDisabledbtn, setIsDisabledbtn] = useState(true);

    // const Json_GetCategory = () => {
    //     setIsDisabledbtn(true);
    //     try {
    //         let o = { SectionId: selectedDocument ? selectedDocument.PostItemTypeID : console.log("Section id is Blanck") };
    //         cls.Json_GetCategory(o, function (sts, data) {
    //             if (sts && data) {
    //                 let js = JSON.parse(data);

    //                 if (js.Table.length > 0) {
    //                     setCategory(js.Table);
    //                      console.log("Json_GetCategory", js);
    //                 }
    //             }

    //         })
    //     } catch (error) {
    //         console.log("Network Error Json_GetCategory", error)
    //     }
    // }

    useEffect(() => {
        setIsDisabledbtn(true);
       // Json_GetCategory();

    }, [selectedDocument])

    const handleChangeCategory=()=>{
        try {
            let o={
                CategoryId:categoryObj,
                ItemIdList:selectedDocument["Registration No."]
            };
            cls.Json_SetCategory(o,function(sts,data){
                if(sts && data){
                    console.log("Json_SetCategory",data);
                    let js = JSON.parse(data);
                        if(js.Status==="Success"){
                            toast.success(js.Message)
                        }
                        else{
                            toast.error("Document Category Is Not Changed Please Try Again !")
                        }
                }
            })
        } catch (error) {
            console.log("Network Error,Json_SetCategory",error)
        }
    }


    return (<>
        <Dialog
            open={Categoryopen}
            onClose={CategoryhandleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='custom-modal'

            sx={{
                maxWidth: 660,
                width: '100%',
                margin: '0 auto'
            }}
        >
            <Box className="d-flex align-items-center justify-content-between modal-head">
                <Box className="dropdown-box">
                    <Typography variant="h4" className='font-18 bold text-black'>
                        Section Category
                    </Typography>
                </Box>

                {/*  */}
                <Button onClick={CategoryhandleClose}>
                    <span className="material-symbols-outlined text-black">
                        cancel
                    </span>
                </Button>
            </Box>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            {AllCategory.length>0 && AllCategory.Table.length > 0 ? (
                                AllCategory.Table.map((item, index) => {
                                   // console.log("Json_GetCategory", item);
                                    return (<>
                                        <FormControlLabel
                                            key={index}
                                            value={item.CatId}
                                            control={<Radio className='text-blue' />}
                                            label={item.CatName}
                                            onChange={(event, value) => {
                                                console.log(event.target.value);
                                                event.preventDefault();
                                                setCategoryObj(event.target.value);
                                                setIsDisabledbtn(false);
                                            }}
                                        />
                                    </>)
                                }

                                )
                            ) : (
                                <FormControlLabel
                                    value=""
                                    control={<Radio className='text-blue' />}
                                    label="No Categories Available"
                                    disabled
                                />
                            )}

                        </RadioGroup>
                    </FormControl>
                </DialogContentText>

                <hr />

                <DialogActions className='justify-content-between'>

                    <Typography variant="h4" className='font-14 bold text-black mb-0'>
                        Doc ID: {selectedDocument?selectedDocument["Registration No."]:""}
                        {/* {console.log(selectedDocudata, "selectedDocudata11")}
                            Doc ID: {selectedDocudata && selectedDocudata["Registration No."] ? selectedDocudata["Registration No."] : selectedDocudata?.ItemId
                            } */}
                    </Typography>


                    <Box>
                        <Button className='btn-red me-2' onClick={CategoryhandleClose}>Cancel</Button>
                        <Button disabled={isDisabledbtn} className='btn-blue-2' onClick={handleChangeCategory} autoFocus>
                            Submit
                        </Button>
                    </Box>
                </DialogActions>
            </DialogContent>
        </Dialog>
    </>)
}
export default SectionCategory;