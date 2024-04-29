import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect } from 'react';

function UdfCard({ data }) {
    console.log("sdfsd", data.Table3);
    useEffect(() => {
        data?.Table3.map(itm => {
            if (itm.TextControlValue === "Date" && itm.UdfValue) {
                const months = {
                    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
                    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
                  };
                const [month, day, year] = itm.UdfValue.trim().split(/\s+/);
                itm.UdfValue = `${day}/${months[month]}/${year}`;
                console.log("djkdskjetuu", itm.UdfValue, "----", `${day}/${months[month]}/${year}`);
            }
        });
    }, []);
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
                                        {data?.Table3.map((data, i) => {
                                            if (item.TagId === data.Tag) {
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

export default UdfCard
