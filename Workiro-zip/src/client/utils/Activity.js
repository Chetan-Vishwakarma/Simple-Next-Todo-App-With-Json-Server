import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, Tabs, Tab, Checkbox, } from '@mui/material';

import { useAutocomplete } from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';
import CommanCLS from '../../services/CommanService';

const options = ['Firefox', 'Google Chrome', 'Microsoft Edge', 'Safari', 'Opera'];


function Activity({ ...props }) {
    let { getAudit } = props;

    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/"; // base url for api
    //   let dt = new LoginDetails();
    let cls = new CommanCLS(baseUrl, agrno, Email, password);

    useEffect(() => {
        setAgrNo(localStorage.getItem("agrno"));
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));
        console.log("getAudit", getAudit)
    }, [getAudit])


    // 
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        focused,
    } = useAutocomplete({
        id: 'controlled-state-demo',
        options,
        value,
        onChange: (event, newValue) => setValue(newValue),
        inputValue,
        onInputChange: (event, newInputValue) => setInputValue(newInputValue),
    });
    // 

    return (

        <Box class="ml-auto mr-auto">

            <Box className='d-flex align-items-center justify-content-center my-3 mb-4'>
                <Layout>
                    <AutocompleteWrapper>
                        <AutocompleteRoot
                            {...getRootProps()}
                            className={focused ? 'Mui-focused' : ''}
                        >
                            <Input {...getInputProps()} />
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
            </Box>

            <hr />

            <Box class="activity-timeline">
                <ul class="timeline-ul">

                    {getAudit ? getAudit.map((item, index) => {
                        return (
                            <>
                                <li key={index}>
                                    <Box class="datetime">
                                        <span>{cls.DateForMate(item["Actioned Date"])}</span>
                                        <span>{ }</span>
                                    </Box>
                                    <Box class="line-dotted">
                                        <Box class="line-time"></Box>
                                        <Box class="circle-time"></Box>

                                        <Box class="circle-border"></Box>
                                    </Box>
                                    <Box class="timeline-details">
                                        <Box class="icon-time-status"></Box>
                                        <Box class="content-time">
                                            <h5>{item.Comments}</h5>
                                            <p>{item["ForwardedBy"]}</p>
                                        </Box>
                                    </Box>
                                </li>
                            </>
                        )

                    }) : ""}
                </ul>
            </Box>
        </Box>
    )
}

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const AutocompleteWrapper = styled('div')`
    position: relative;
  `;

const AutocompleteRoot = styled('div')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };
    display: flex;
    gap: 5px;
    padding-right: 5px;
    overflow: hidden;
    width: 320px;
  
    &.Mui-focused {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
    }
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus-visible {
      outline: 0;
    }
  `,
);

const Input = styled('input')(
    ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: inherit;
    border: none;
    border-radius: inherit;
    padding: 8px 12px;
    outline: 0;
    flex: 1 0 auto;
  `,
);

const Listbox = styled('ul')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    max-width: 320px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    max-height: 300px;
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
        };
    `,
);

const Option = styled('li')(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &:hover {
      cursor: pointer;
    }
  
    &[aria-selected=true] {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
  
    &.Mui-focused,
    &.Mui-focusVisible {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.Mui-focusVisible {
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    &[aria-selected=true].Mui-focused,
    &[aria-selected=true].Mui-focusVisible {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
    }
    `,
);

const Layout = styled('div')`
    // display: flex;
    // flex-flow: column nowrap;
    // gap: 4px;
  `;

export default Activity