import React from 'react'
import { Box, Typography } from '@mui/material';
import company from "../../images/building.svg";
import user from "../../images/user.jpg";
import user2 from "../../images/user-2.svg";
import noData from "../../images/no-data.gif";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

// search
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InfoIcon from '@mui/icons-material/Info';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function CardView(props) {
  const {
    isSearch, handleDialogsOpen, handleSearch, filteredClientsForSearchBox, handleClientNavigation, filteredContactsForSearchBox,
    handleContactNavigattion, handleFolderSelection, isFolder, allFolders, isChoice, isAdvFilter, selectedProperty,
    setSelectedProperty, clientKeys, contactKeys, selectedPropertyValue, setSelectedPropertyValue, advSearchKeyValue,
    setSelectedColor, colorArr, handleAdvanceFilterAgain, handleFilterRemove, onlyClients, filteredClients, clients,
    onlyContacts, filteredContacts, contacts, selectedFolder, selectedChoice, basedOnClientContactAndAll, objFilter, isDataNotFoundInClient, isDataNotFoundInContact, isDataNotFoundInBoth, objFilterColor, loadMore
  } = props;
  return (
    <>
      {
        isDataNotFoundInBoth ? <Box className='text-center no-data-found'>
        <img src={noData} />
        <h4 className='font-18 text-gray'>Data Not Found</h4></Box> : (onlyClients && (filteredClients.length > 0 ? filteredClients.map((item, i) => {
          return <Box key={i} className='client-box-main'>
            <Box className='client-box' onClick={() => handleClientNavigation(item.OriginatorNo)}>

              <Box className='client-box-icons d-flex relative'>

                <Box className='info-details'>
                  <ApartmentIcon />
                  <Box className='inner-info-details'>
                    <ContentCopyIcon />

                    <ul className='p-0 mb-0'>
                      <li>
                        <LocalPhoneIcon />
                        {(item["Contact Number"]&&item["Contact Number"]!=="")? item["Contact Number"]: "ContactNo Not Found"}
                      </li>
                      <li>
                        <EmailIcon className='font-16' />
                        {(item["E-Mail"]&&item["E-Mail"]!=="")? item["E-Mail"]: "Email Not Found"}
                      </li>
                      <li>
                        <LocationOnIcon />
                        {(item["Address Line 1"]&&item["Address Line 1"]!=="")? item["Address Line 1"]: "Address Not Found"}
                      </li>
                    </ul>
                  </Box>
                </Box>

                <InfoIcon />
                {/* <PersonIcon /> */}

              </Box>

              <Box className='inner-client-box'>
                {/* <img src={pin} className='pin-img' /> */}
                <Box className='client-img'>
                  <img src={company} />
                </Box>
                <Typography variant="h2">{item["Company Name"] && (item["Company Name"].length > 25 ? (item["Company Name"].substr(0, 20) + ".") : item["Company Name"])}</Typography>
                {/* <Typography variant='h4'>Admin</Typography> */}
                <Typography variant='p' className='mb-0'>{item["E-Mail"] && (item["E-Mail"].substr(0, 22) + ".")}</Typography>
              </Box>
              {Object.keys(objFilter).length>0&&<Box className='color-filter-box mt-3'>
                {Object.keys(objFilter).map((key) => {
                  console.log("sdfkfdsksdfj",key);
                  return <Typography variant='span' className='color-filter-row' style={{ color: objFilterColor[key], borderColor: objFilterColor[key] }}>
                    {
                      key === "SourceName" ? item["Source"] &&  item["Source"]
                      : key==="Address 1" ? item["Address Line 1"] && item["Address Line 1"]
                      : key==="Address 2" ? item["Address Line 2"] && item["Address Line 2"]
                      : key==="Address 3" ? item["Address Line 3"] && item["Address Line 3"]
                      : key==="ContactNo" ? item["Contact Number"] && item["Contact Number"]
                      : key==="StatusName" ? item["Status"] && item["Status"]
                      : key==="SourceName" ? item["Source"] && item["Source"]
                      : item[key]
                    }</Typography>;
                })}
              </Box>}
            </Box>
          </Box>
        }) : isDataNotFoundInClient ? <Box className='text-center no-data-found'>
          <img src={noData} />
          <h4 className='font-18 text-gray'>Data Not Found</h4></Box> : clients.slice(0,loadMore).map((item, i) => {
          return <Box key={i} className='client-box-main'>
            <Box className='client-box sadik' onClick={() => handleClientNavigation(item.OriginatorNo)}>
              {/* <img src={pin} className='pin-img' /> */}

              <Box className='client-box-icons d-flex'>
                {/* <PersonIcon className="me-2" /> */}
                <Tooltip title="Client" className='my-1'>
                  <IconButton>
                    <ApartmentIcon />
                  </IconButton>
                </Tooltip>
                <Box className='info-details'>
                  <Tooltip title="" className='my-1'>
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>

                  <Box className='inner-info-details'>
                    <Tooltip title="Copy Details" className='my-1 copy-icon'>
                      <IconButton>
                        <ContentCopyIcon className='font-18' />
                      </IconButton>
                    </Tooltip>
                    <ul className='p-0 mb-0'>
                      <li>
                        <LocalPhoneIcon />
                        {(item["Contact Number"]&&item["Contact Number"]!=="")? item["Contact Number"]: "ContactNo Not Found"}
                      </li>
                      <li>
                        <EmailIcon className='font-16' />
                        {(item["E-Mail"]&&item["E-Mail"]!=="")? item["E-Mail"]: "Email Not Found"}
                      </li>
                      <li>
                        <LocationOnIcon />
                        {(item["Address Line 1"]&&item["Address Line 1"]!=="")? item["Address Line 1"]: "Address Not Found"}
                      </li>
                    </ul>
                  </Box>
                </Box>
              </Box>

              <Box className='client-img'>
                <img src={company} />
              </Box>
              <Typography variant="h2">{item["Company Name"] && (item["Company Name"].length > 25 ? (item["Company Name"].substr(0, 20) + ".") : item["Company Name"])}</Typography>
              {/* <Typography variant='h4'>Admin</Typography> */}
              <Typography variant='p' className='mb-0'>{item["CompanyNo"]!==""&&item["CompanyNo"]!==null ? item["CompanyNo"] : "CH No. Not Found"}</Typography>
            </Box>
          </Box>
        })))
      }

      {
        isDataNotFoundInBoth ? <></> : (onlyContacts && (filteredContacts.length > 0 ? filteredContacts.map((item, i) => {
          return <Box key={i} className='client-box-main'>
            <Box className='client-box sadik' onClick={() => handleContactNavigattion(item.OriginatorNo, item.ContactNo)}>

              <Box className='client-box-icons d-flex'>
                {/* <PersonIcon className="me-2" /> */}
                <Tooltip title="Client" className='my-1'>
                  <IconButton>
                    <ApartmentIcon />
                  </IconButton>
                </Tooltip>
                <Box className='info-details'>
                  <Tooltip title="" className='my-1'>
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>

                  <Box className='inner-info-details'>
                    <Tooltip title="Copy Details" className='my-1 copy-icon'>
                      <IconButton>
                        <ContentCopyIcon className='font-18' />
                      </IconButton>
                    </Tooltip>
                    <ul className='p-0 mb-0'>
                      <li>
                        <LocalPhoneIcon />
                        {(item["Mobile"] && item["Mobile"]!=="")? item["Mobile"]: "Mobile No. Not Found"}
                      </li>
                      <li>
                        <EmailIcon className='font-16' />
                        {(item["E-Mail"] && item["E-Mail"]!=="")? item["E-Mail"]: "Email Not Found"}
                      </li>
                      <li>
                        <LocationOnIcon />
                        {(item["Address 1"] && item["Address 1"]!=="")? item["Address 1"]: "Address Not Found"}
                      </li>
                    </ul>
                  </Box>
                </Box>
              </Box>

              {/* <img src={pin} className='pin-img' /> */}
              <Box className='inner-client-box'>

                <Box className='client-img'>
                  <img src={user} />
                </Box>
                <Typography variant="h2">{item["First Name"] && item["First Name"]} {item["Last Name"] && item["Last Name"]}</Typography>
                <Typography variant='h4'>{item["Company Name"] && item["Company Name"].substr(0.15) + '.'}</Typography>
                {/* <Typography variant='p' className='mb-0'>{item["E-Mail"] && item["E-Mail"].substr(0, 22) + "."}</Typography> */}
              </Box>

              <Box className='color-filter-box mt-3'>
                {Object.keys(objFilter).map((key) => {
                  return <Typography variant='span' className='color-filter-row' style={{ color: objFilterColor[key], borderColor: objFilterColor[key] }}>{item[key]}</Typography>;
                })}
              </Box>
            </Box>
          </Box>
        }) : isDataNotFoundInContact ? <Box className='text-center no-data-found'>
        <img src={noData} />
        <h4 className='font-18 text-gray'>Data Not Found</h4></Box> : contacts.slice(0, loadMore).map((item, i) => {
          return <Box key={i} className='client-box-main'>
            <Box className='client-box sadik' onClick={() => handleContactNavigattion(item.OriginatorNo, item.ContactNo)}>

              <Box className='client-box-icons d-flex'>
                {/* <PersonIcon className="me-2" /> */}
                <Tooltip title="Contacts" className='my-1'>
                  <IconButton>
                    <PersonIcon />
                  </IconButton>
                </Tooltip>
                <Box className='info-details'>
                  <Tooltip title="" className='my-1'>
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>

                  <Box className='inner-info-details'>
                    <Tooltip title="Copy Details" className='my-1 copy-icon'>
                      <IconButton>
                        <ContentCopyIcon className='font-18' />
                      </IconButton>
                    </Tooltip>
                    <ul className='p-0 mb-0'>
                      <li>
                        <LocalPhoneIcon />
                        {(item["Mobile"] && item["Mobile"]!=="")? item["Mobile"]: "Mobile No. Not Found"}
                      </li>
                      <li>
                        <EmailIcon className='font-16' />
                        {(item["E-Mail"] && item["E-Mail"]!=="")? item["E-Mail"]: "Email Not Found"}
                      </li>
                      <li>
                        <LocationOnIcon />
                        {(item["Address 1"] && item["Address 1"]!=="")? item["Address 1"]: "Address Not Found"}
                      </li>
                    </ul>
                  </Box>
                </Box>
              </Box>

              {/* <img src={pin} className='pin-img' /> */}
              <Box className='client-img'>
                <img src={user2} />
              </Box>
              <Typography variant="h2">{item["First Name"] && item["First Name"]} {item["Last Name"] && item["Last Name"]}</Typography>
              <Typography variant='h4'>{item["Company Name"] && item["Company Name"].substr(0.15) + '.'}</Typography>
              {/* <Typography title={item["E-Mail"]} variant='p' className='mb-0'>{item["E-Mail"] && (item["E-Mail"].substr(0, 22) + ".")}</Typography> */}
            </Box>
          </Box>
        })))
      }
    </>
  )
}

export default CardView
