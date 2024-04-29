import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

function ContactcardUDF({ data }) {
    console.log(data,"sonamcontactudfsdfsd", data.Table1);
    return (
        <>
            {
                Object.keys(data).length > 0
                && data?.Table.map((item, i) => {
                    return <Accordion className='accordian-box' defaultExpanded={i === 0 ? true : false}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            {item.TagName}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box className='table-responsive'>
                                <table className='table'>
                                    <tbody>
                                        {data?.Table1.map((data, i) => {
                                            if (item.TagID === data.Tag) {
                                                return <tr>
                                                    <th>{data.Name}</th>
                                                    <td>{data.UdfValue === "undefined" ? "" : data.UdfValue}</td>
                                                </tr>
                                            }
                                        })}
                                    </tbody>
                                </table>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                })
            }
        </>
    )
}

export default ContactcardUDF
