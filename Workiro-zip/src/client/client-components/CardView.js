import React from 'react'
import { Box, Typography } from '@mui/material';
import user from "../../images/user.jpg";
import Button from "@mui/material/Button";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';
// search
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';



function CardView(props) {
    const {
        isSearch, handleDialogsOpen, handleSearch, filteredClientsForSearchBox, handleClientNavigation, filteredContactsForSearchBox,
        handleContactNavigattion, handleFolderSelection, isFolder, allFolders, isChoice, isAdvFilter, selectedProperty, 
        setSelectedProperty, clientKeys, contactKeys, selectedPropertyValue, setSelectedPropertyValue, advSearchKeyValue,
        setSelectedColor, colorArr, handleAdvanceFilterAgain, handleFilterRemove, onlyClients, filteredClients, clients,
        onlyContacts, filteredContacts, contacts, selectedFolder, selectedChoice, basedOnClientContactAndAll
    } = props;
  return (
    <>
                        {
                            onlyClients && (filteredClients.length > 0 ? filteredClients.map((item, i) => {
                                return <Box key={i} className='client-box-main'>
                                    <Box className='client-box' onClick={() => handleClientNavigation(item.OriginatorNo)}>
                                        {/* <img src={pin} className='pin-img' /> */}
                                        <Box className='client-img'>
                                            <img src={user} />
                                        </Box>
                                        <Typography variant="h2">{item["Company Name"] && item["Company Name"].substr(0, 12) + "."}</Typography>
                                        {/* <Typography variant='h4'>Admin</Typography> */}
                                        <Typography variant='p' className='mb-0'>{item["E-Mail"] && (item["E-Mail"].length > 25 ? (item.Client.substr(0, 20) + ".") : item.Client)}</Typography>
                                        <Box className='color-filter-box mt-3'>
                                            {advSearchKeyValue.map((data) => {
                                                return <Typography variant='span' className='color-filter-row' style={{ color: data.color, borderColor: data.color }}>{item[data.key]}</Typography>;
                                            })}
                                            {/* <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography> */}
                                        </Box>
                                    </Box>
                                </Box>
                            }) : clients.map((item, i) => {
                                return <Box key={i} className='client-box-main'>
                                    <Box className='client-box' onClick={() => handleClientNavigation(item.OriginatorNo)}>
                                        {/* <img src={pin} className='pin-img' /> */}
                                        <Box className='client-img'>
                                            <img src={user} />
                                        </Box>
                                        <Typography variant="h2">{item["Company Name"] && (item["Company Name"].length > 25 ? (item["Company Name"].substr(0, 20) + ".") : item["Company Name"])}</Typography>
                                        {/* <Typography variant='h4'>Admin</Typography> */}
                                        <Typography variant='p' className='mb-0'>{item["E-Mail"] && (item["E-Mail"].substr(0, 22) + ".")}</Typography>
                                        {/* <Box className='color-filter-box mt-3'>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                                        </Box> */}
                                    </Box>
                                </Box>
                            }))
                        }

                        {
                            onlyContacts && (filteredContacts.length > 0 ? filteredContacts.map((item, i) => {
                                return <Box key={i} className='client-box-main'>
                                    <Box className='client-box' onClick={() => handleContactNavigattion(item.OriginatorNo,item.ContactNo)}>
                                        {/* <img src={pin} className='pin-img' /> */}
                                        <Box className='client-img'>
                                            <img src={user} />
                                        </Box>
                                        <Typography variant="h2">{item["First Name"]&&item["First Name"]} {item["Last Name"]&&item["Last Name"]}</Typography>
                                        <Typography variant='h4'>{item["Company Name"]&& item["Company Name"].substr(0.15)+'.'}</Typography>
                                        <Typography title={item["E-Mail"]} variant='p' className='mb-0'>{item["E-Mail"] && item["E-Mail"].substr(0, 22) + "."}</Typography>
                                        <Box className='color-filter-box mt-3'>
                                            {advSearchKeyValue.map((data) => {
                                                return <Typography variant='span' className='color-filter-row' style={{ color: data.color, borderColor: data.color }}>{item[data.key]}</Typography>;
                                            })}
                                            {/* <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography> */}
                                        </Box>
                                    </Box>
                                </Box>
                            }) : contacts.map((item, i) => {
                                return <Box key={i} className='client-box-main'>
                                    <Box className='client-box' onClick={() => handleContactNavigattion(item.OriginatorNo,item.ContactNo)}>
                                        {/* <img src={pin} className='pin-img' /> */}
                                        <Box className='client-img'>
                                            <img src={user} />
                                        </Box>
                                        <Typography variant="h2">{item["First Name"]&&item["First Name"]} {item["Last Name"]&&item["Last Name"]}</Typography>
                                        <Typography variant='h4'>{item["Company Name"]&& item["Company Name"].substr(0.15)+'.'}</Typography>
                                        <Typography title={item["E-Mail"]} variant='p' className='mb-0'>{item["E-Mail"]&& (item["E-Mail"].substr(0, 22) + ".")}</Typography>
                                        {/* <Box className='color-filter-box mt-3'>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#d80505", borderColor: "#d80505" }}>Red</Typography>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#3b7605", borderColor: "#3b7605" }}>Green</Typography>
                                            <Typography variant='span' className='color-filter-row' style={{ color: "#01018d", borderColor: "#01018d" }}>Blue</Typography>
                                        </Box> */}
                                    </Box>
                                </Box>
                            }))
                        }
                        </>
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

  &.base--focused,
  &.base--focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.base--focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &[aria-selected=true].base--focused,
  &[aria-selected=true].base--focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);

const Layout = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  gap: 4px;
`;

const Pre = styled('pre')(({ theme }) => ({
    margin: '0.5rem 0',
    fontSize: '0.75rem',
    '& code': {
        backgroundColor: theme.palette.mode === 'light' ? grey[100] : grey[900],
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? grey[300] : grey[700],
        color: theme.palette.mode === 'light' ? '#000' : '#fff',
        padding: '0.125rem 0.25rem',
        borderRadius: 3,
    },
}));

export default CardView
