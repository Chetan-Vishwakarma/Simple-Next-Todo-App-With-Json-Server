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
    <Box className='row'>
                <Box className='col-lg-12'>
                    <Box className='d-flex main-search-box mb-2'>
                        <Box className="search-box">
                            <Layout>
                                <AutocompleteWrapper>
                                    <AutocompleteRoot
                                        sx={{
                                            borderColor: '#D5D5D5',
                                            color: 'success.main',
                                        }}
                                        className={isSearch ? 'Mui-focused' : ''}>
                                        <span className="material-symbols-outlined search-icon">search</span>

                                        <Input onClick={(e) => handleDialogsOpen(e,"Search")} onChange={(e) => handleSearch(e.target.value)} placeholder='Search' className='ps-0' />
                                    </AutocompleteRoot>

                                    {isSearch && <Listbox>
                                        {filteredClientsForSearchBox.length > 0 ? filteredClientsForSearchBox.map((option, i) => (
                                            <Option key={i} onClick={() => handleClientNavigation(option.ClientID)}>
                                                <ApartmentIcon className='me-1' />
                                                {option.Client}</Option>
                                        )) : clients.map((option, i) => (
                                            <Option key={i} onClick={() => handleClientNavigation(option.ClientID)}><ApartmentIcon className='me-1' />{option.Client}</Option>
                                        ))}
                                        {filteredContactsForSearchBox.length > 0 ? filteredContactsForSearchBox.map((option, i) => (
                                            <Option key={i} onClick={() => handleContactNavigattion(option.OriginatorNo,option.ContactNo)}><PersonIcon className='me-1' />{option["Company Name"]}</Option>
                                        )) : contacts.map((option, i) => (
                                            <Option key={i} onClick={() => handleContactNavigattion(option.OriginatorNo,option.ContactNo)}><PersonIcon className='me-1' />{option["Company Name"]}</Option>
                                        ))}
                                    </Listbox>}

                                </AutocompleteWrapper>
                            </Layout>
                        </Box>

                        <Box className="dropdown-box ms-4">
                            <Button className='btn-select' onClick={(e) => handleDialogsOpen(e,"Folder")}>{selectedFolder}</Button>
                            {isFolder && <Box className="btn-Select">
                                {allFolders.map((item) => {
                                    // pass folder-id in onClick handler
                                    return <Button className='btn-white' onClick={() => handleFolderSelection(item.FolderID, item.Folder)}>{item.Folder}</Button>
                                })}
                            </Box>}
                        </Box>

                        <Box className="dropdown-box ms-4">
                            <Button className='btn-select' onClick={(e) => handleDialogsOpen(e,"Choice")}>{selectedChoice}</Button>
                            {isChoice && <Box className="btn-list-box btn-Select">
                                {["All", "Clients", "Contacts"].map((item) => {
                                    return <Button className='btn-list' onClick={() => basedOnClientContactAndAll(item)}>{item}</Button>
                                })}
                            </Box>}
                        </Box>

                        <Box className="dropdown-box ms-4">
                            <Box>
                                <Fab size="small" className='btn-plus' aria-label="add" onClick={(e) => handleDialogsOpen(e,"AdvFilter")}>
                                    <AddIcon />
                                </Fab>
                            </Box>

                            {isAdvFilter && <Box className="btn-Select color-pic-box" onClick={(e)=>{
                                e.preventDefault();
                                e.stopPropagation();
                            }}>
                                <Box className='clearfix'>

                                    <Box className='clearfix'>
                                        <Typography variant='Body1' className='mb-2 d-block  bold'>Filter:</Typography>
                                        {/* <Box className="mb-2">
                                            {advSearchKeyValue.map((item) => {
                                                return <Button sx={{ backgroundColor: item.color }} className='btn-white'>{item.key}: {item.value}
                                                    <span onClick={() => handleFilterRemove(item)} className="material-symbols-outlined font-16 text-danger">
                                                        close
                                                    </span></Button>
                                            })}

                                            <Fab size="small" className='btn-plus  ms-2' aria-label="add">
                                                <AddIcon />
                                            </Fab>
                                        </Box> */}

                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='mb-2'>
                                                    <label>Select Property</label>
                                                    <select value={selectedProperty} onChange={(e) => { setSelectedProperty(e.target.value) }} class="form-select" aria-label="Default select example">
                                                        <option value={""}>Select</option>
                                                        {clientKeys.map((item, i) => {
                                                            return <option key={i} value={item}>{item}</option>
                                                        })}
                                                        {contactKeys.map((item, i) => {
                                                            return <option key={i} value={item}>{item}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col-md-4 px-0'>
                                                <div className='mb-2'>
                                                    <label>Value</label>
                                                    <input value={selectedPropertyValue} onChange={(e) => { setSelectedPropertyValue(e.target.value) }} type="text" class="form-control" placeholder="Type Value" />
                                                </div>
                                            </div>
                                            <div className='col-md-4'>
                                                <Box className='clearfix'>
                                                    <Typography variant='Body1' className='mb-1'>Labels</Typography>

                                                    <Box className="color-box">
                                                        {
                                                            advSearchKeyValue.length === 0 && <><button onClick={(e) => setSelectedColor(colorArr[0])} type='button' className='btn-color selected' style={{ backgroundColor: colorArr[0] }}></button>
                                                                <button onClick={() => setSelectedColor(colorArr[1])} type='button' className='btn-color' style={{ backgroundColor: colorArr[1] }}></button></>
                                                        }
                                                        {
                                                            advSearchKeyValue.length === 1 && <><button onClick={() => setSelectedColor(colorArr[2])} type='button' className='btn-color selected' style={{ backgroundColor: colorArr[2] }}></button>
                                                                <button onClick={() => setSelectedColor(colorArr[3])} type='button' className='btn-color' style={{ backgroundColor: colorArr[3] }}></button></>
                                                        }
                                                        {
                                                            advSearchKeyValue.length === 2 && <><button onClick={() => setSelectedColor(colorArr[4])} type='button' className='btn-color selected' style={{ backgroundColor: colorArr[4] }}></button>
                                                                <button onClick={() => setSelectedColor(colorArr[5])} type='button' className='btn-color' style={{ backgroundColor: colorArr[5] }}></button></>
                                                        }
                                                    </Box>
                                                </Box>
                                            </div>
                                        </div>


                                        <div className='mt-2'>
                                            <Button onClick={handleAdvanceFilterAgain} variant="contained" size='small' color="success">
                                                <span class="material-symbols-outlined">
                                                    add
                                                </span> Add
                                            </Button>
                                        </div>
                                    </Box>
                                </Box>
                            </Box>}
                        </Box>
                        {/*  */}

                        <Box className="mb-2 ms-3">
                            {advSearchKeyValue.map((item) => {
                                return <Button sx={{ backgroundColor: item.color }} className='btn-white text-white'><span className='text-white'>{item.key}: {item.value}</span>
                                    <span onClick={() => handleFilterRemove(item)} className="material-symbols-outlined font-16 text-white">
                                        close
                                    </span></Button>
                            })}

                            {/* <Fab size="small" className='btn-plus  ms-2' aria-label="add">
                                <AddIcon />
                            </Fab> */}
                        </Box>


                    </Box>

                    <Box className='row'>

                        {
                            onlyClients && (filteredClients.length > 0 ? filteredClients.map((item, i) => {
                                return <Box key={i} className='client-box-main'>
                                    <Box className='client-box' onClick={() => handleClientNavigation(item.ClientID)}>
                                        {/* <img src={pin} className='pin-img' /> */}
                                        <Box className='client-img'>
                                            <img src={user} />
                                        </Box>
                                        <Typography title={item.Client} variant="h2">{item.Client && item.Client.substr(0, 12) + "."}</Typography>
                                        <Typography variant='h4'>Admin</Typography>
                                        <Typography title={item.Email} variant='p' className='mb-0'>{item.Client && (item.Client.length > 25 ? (item.Client.substr(0, 20) + ".") : item.Client)}</Typography>
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
                                    <Box className='client-box' onClick={() => handleClientNavigation(item.ClientID)}>
                                        {/* <img src={pin} className='pin-img' /> */}
                                        <Box className='client-img'>
                                            <img src={user} />
                                        </Box>
                                        <Typography title={item.Client} variant="h2">{item.Client && (item.Client.length > 25 ? (item.Client.substr(0, 20) + ".") : item.Client)}</Typography>
                                        <Typography variant='h4'>Admin</Typography>
                                        <Typography title={item.Email} variant='p' className='mb-0'>{item.Email && (item.Email.substr(0, 22) + ".")}</Typography>
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
                                        <Typography title={item["Company Name"]} variant="h2">{item["Company Name"]&& (item["Company Name"].length > 25 ? (item["Company Name"].substr(0, 20) + ".") : item["Company Name"])}</Typography>
                                        <Typography variant='h4'>Admin</Typography>
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
                                        <Typography title={item["Company Name"]} variant="h2">{item["Company Name"]&& (item["Company Name"].length > 25 ? (item["Company Name"].substr(0, 20) + ".") : item["Company Name"])}</Typography>
                                        <Typography variant='h4'>Admin</Typography>
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
                    </Box>
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
