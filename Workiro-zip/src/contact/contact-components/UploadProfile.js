import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import CommanCLS from '../../services/CommanService';

const Input = styled('input')({
  display: 'none',
});

export default function UploadButtons({ userContactDetails, setContactDetails }) {
  console.log(userContactDetails, "setContactDetails_TEST");
  const [images, setImages] = useState([]);
  const [contactImgdata, setContactImgdata] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
  const [password, setPassword] = useState(localStorage.getItem("Password"));
  const [Email, setEmail] = useState(localStorage.getItem("Email"));
  const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
  const [intUserid, setIntUserid] = useState(localStorage.getItem("UserId"));
  const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
  const [folders, setFolders] = useState([]);
  // const handleFileChange = (event) => {
  //   const selectedFiles = Array.from(event.target.files);
  //   setImages(selectedFiles.map((file) => URL.createObjectURL(file)));
  //   setPreviewImage(URL.createObjectURL(selectedFiles[0])); // Set the first image as preview
  //   console.log(images,"previewimg",previewImage);

  // };
  const clientWebUrl = "https://docusms.uk/dswebclientmanager.asmx/";
  let Cls = new CommanCLS(baseUrl, agrno, Email, password);
  let webClientCLS = new CommanCLS(clientWebUrl, agrno, Email, password);
  const Json_UpdateContactField = (base64) => {
    let requestBody = {
      "agrno": agrno,
      "Email": Email,
      "password": password,
      "projectid": folderId,
      "ClientId": "0007",
      "ContactNo": null,
      "fieldName": "imgPath",
      "fieldValue": base64
    }
    try {
      Cls.Json_UpdateContactField(requestBody, (sts, data) => {
        if (sts) {
          if (data) {
            console.log(data, "getdata")
            // let json = JSON.parse(data);
            // setFolders(json.Table);
          }
        }
      });
    } catch (err) {
      console.log("Error while calling Json_GetToFavourites", err);
    }
  };
  const Json_GetContactNumber = () => {
    let requestBody = {
      "agrno": agrno,
      "Email": Email,
      "password": password,
      "ClientId": "0007",
      "ContactEmail": ""
    }
    try {
      Cls.Json_GetContactNumber(requestBody, (sts, data) => {
        if (sts) {
          if (data) {
            let json = JSON.parse(data);
            // setFolders(json.Table);
          }
        }
      });
    } catch (err) {
      console.log("Error while calling Json_GetToFavourites", err);
    }
  };
  useEffect(() => {
    setAgrNo(localStorage.getItem("agrno"));
    setPassword(localStorage.getItem("Password"));
    setEmail(localStorage.getItem("Email"));
    setFolderId(localStorage.getItem("FolderId"));
    setIntUserid(localStorage.getItem("UserId"));
    //   Json_GetClientCardDetails();
    Json_UpdateContactField();
    // Json_GetConfiguration();
  }, []);
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    // Create an array to store base64 representations of selected files
    const base64Images = [];

    // Use FileReader to read each file as base64
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        base64Images.push(e.target.result);
        console.log(e.target.result, "bae64daataa")
        // Json_UpdateContactField(e.target.result);
        setContactImgdata(e.target.result);
        let imgdata = e.target.result;
        let data = { ...userContactDetails };
        data = { ...data, ["Base64ImgData"]: imgdata }
        console.log(data, "getiMAGE");
        setContactDetails(data);
        // If all files have been read, set the images state and preview the first image
        if (base64Images.length === selectedFiles.length) {
          setImages(base64Images);
          setPreviewImage(base64Images[0]); // Set the first image as preview
          console.log(images, "previewimccccg", previewImage);
        }
      };
      reader.readAsDataURL(file);
    });
    console.log(contactImgdata, "contactImage")

  };

  const removeImage = (indexToRemove) => {
    const filteredImages = images.filter(
      (_, index) => index !== indexToRemove
    );
    setImages(filteredImages);
    setPreviewImage(filteredImages.length > 0 ? filteredImages[0] : null); // Update preview image
  };

  return (
    <Stack alignItems="start" spacing={2}>


      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleFileChange}
        />
      </label>

      <div className='m-auto'>
        {images.map((image, index) => (
          <div
            key={index}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                style={{ width: '100px', height: '100px', borderRadius: '90px' }}
              />
            ) : (
              <img
                // src={}
                alt="Preview"
                style={{ width: '100px', height: '100px', borderRadius: '90px' }}
              />
            )}
            <IconButton
              className='btn-remove'
              onClick={() => removeImage(index)}
            >
              <ClearIcon />
            </IconButton>
          </div>
        ))}
        {images.length === 0 && !previewImage && (
          <img src="https://via.placeholder.com/100" alt="Blank Preview" style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px',  borderRadius: '90px'  }} />
        )}
      </div>


      <label htmlFor="contained-button-file">
        <Input
          accept="*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        <Button variant="contained" component="span"
          size='small'
          className='btn-blue-2 text-nowrap'>
          <IconButton

            // color="primary"
            className='font-16 text-white'
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera className='font-18' />
          </IconButton>
          Image Upload
        </Button>
      </label>

    </Stack>
  );
}
