import React, { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Fileformat from '../../images/files-icon/pdf.png';

const Layout = styled('div')`  display: flex;
  flex-flow: column nowrap;  gap: 4px;
`;
const AutocompleteWrapper = styled('div')`  position: relative;
`;

const blue = {
    100: '#DAECFF',
    200: '#99CCF3', 400: '#3399FF',
    500: '#007FFF', 600: '#0072E5',
    700: '#0059B2', 900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2', 200: '#DAE2ED',
    300: '#C7D0DD', 400: '#B0B8C4',
    500: '#9DA8B7', 600: '#6B7A90',
    700: '#434D5B', 800: '#303740',
    900: '#1C2025',
};

const AutocompleteRoot = styled('div')(({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;  font-weight: 400;
  border-radius: 8px;  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'};
  display: flex;  gap: 5px;
  padding-right: 5px;  overflow: hidden;
  width: 320px;
  &.Mui-focused {    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};  }
  &:hover {
    border-color: ${blue[400]};  }
  &:focus-visible {
    outline: 0;
  }`,
);
const Input = styled('input')(
    ({ theme }) => `  font-size: 0.875rem;
  font-family: inherit;  font-weight: 400;
  line-height: 1.5;  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;  border: none;
  border-radius: inherit;  padding: 8px 12px;
  outline: 0;  flex: 1 0 auto;
`,);
const Listbox = styled('ul')(
    ({ theme }) => `  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;  box-sizing: border-box;
  padding: 6px;  margin: 12px 0;
  max-width: 320px;  border-radius: 12px;
  overflow: auto;  outline: 0px;
  max-height: 300px;  z-index: 1;
  position: absolute;  left: 0;
  right: 0;  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'};
  `,);
const Option = styled('li')(
    ({ theme }) => `  list-style: none;
  padding: 8px;  border-radius: 8px;
  cursor: default;
  &:last-of-type {    border-bottom: none;
  }
  &:hover {    cursor: pointer;
  }
  &[aria-selected=true] {    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};  }
  &.base--focused,
  &.base--focusVisible {    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};  }
  &.base--focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};  }
  &[aria-selected=true].base--focused,
  &[aria-selected=true].base--focusVisible {    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};  }
  `,);

function DocumentList() {

    const [groupedOptions, setgroupedOptions] = useState([]);

    function getInputProps(params) {

    }
    function getRootProps(params) {

    }
    function getListboxProps(params) {

    }
    function getOptionProps(params) {

    }

    return (
        <Box className='p-0'>

            <Layout>
                <AutocompleteWrapper>
                    <AutocompleteRoot
                        sx={{
                            borderColor: '#D5D5D5',
                            color: 'success.main',
                        }}
                        {...getRootProps()}
                    // className={focused ? 'Mui-focused' : ''}
                    >
                        <span className="material-symbols-outlined search-icon">search</span>

                        <Input {...getInputProps()} placeholder='Search' className='ps-0' />
                    </AutocompleteRoot>
                    {groupedOptions.length > 0 && (
                        <Listbox {...getListboxProps()}>
                            {groupedOptions.map((option, index) => (
                                <Option {...getOptionProps({ option, index })}>{option}</Option>
                            ))}
                        </Listbox>
                    )}
                </AutocompleteWrapper>
            </Layout>

            <Box className="search-box">

                <Box className='row'>

                    {Array(6).fill("").map(() => {
                        return <>

                            <Box className='col-xl-4 col-md-6'>
                                <Box className="file-uploads">
                                    <label className="file-uploads-label file-uploads-document">
                                        <Box className="d-flex align-items-center">
                                            <div className='img-format'>
                                                <img src={Fileformat} />
                                            </div>
                                            <Box className="upload-content pe-3">
                                                <Typography variant="h4" >
                                                    This FilThis File is Test Files.pdfe is Test Files.pdf
                                                </Typography>
                                                <Typography variant="body1">
                                                    12:36PM 28/12/2023 | 555KB
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </label>
                                </Box>
                                {/* file upload end */}
                            </Box>

                        </>
                    })}




                </Box>




            </Box>
        </Box>
    )
}


export default DocumentList;