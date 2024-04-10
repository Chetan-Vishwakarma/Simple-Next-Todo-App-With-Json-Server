import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
const Input = styled('input')({
  display: 'none',
});
export default function UploadButtons({ userContactDetails, setContactDetails }) {
  console.log(userContactDetails, "setContactDetails_TEST");
  const [images, setImages] = useState([]);
  const [contactImgdata, setContactImgdata] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const base64Images = [];
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        base64Images.push(e.target.result);
        console.log(e.target.result, "bae64daataa");
        setContactImgdata(e.target.result);
        let imgdata = e.target.result;
        let data = { ...userContactDetails };
        data = { ...data, ["Base64ImgData"]: imgdata }
        console.log(data, "getiMAGE");
        setContactDetails(data);
        if (base64Images.length === selectedFiles.length) {
          setImages(base64Images);
          setPreviewImage(base64Images[0]); 
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove) => {
    const filteredImages = images.filter(
      (_, index) => index !== indexToRemove
    );
    setImages(filteredImages);
    setPreviewImage(filteredImages.length > 0 ? filteredImages[0] : null); 
  };

  return (
    <Stack alignItems="start" spacing={2} className='position-sticky top-0'>
      <label htmlFor="icon-button-file">
        <Input
          id="icon-button-file"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
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
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" alt="Blank Preview" style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px',  borderRadius: '90px'  }} />
        )}
      </div>
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        <Button variant="contained" component="span"
          size='small'
          className='btn-blue-2 text-nowrap'>
          <IconButton
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
