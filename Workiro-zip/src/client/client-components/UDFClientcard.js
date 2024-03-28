import { Box, Grid, TextField, Autocomplete, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommanCLS from "../../services/CommanService";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
const  UDFClientcard =  React.memo(({ data, setDataFromChild })=> {
  console.log(data?.Table, "sdfsd", data.Table3);
  const [selectManager, setselectManagers] = useState([]);
  const [selectedDatetest, setSelectedDatetest] = useState([]);
  const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
  let Cls = new CommanCLS(
    baseUrl,
    localStorage.getItem("agrno"),
    localStorage.getItem("Email"),
    localStorage.getItem("Password")
  );
  const Json_GetForwardUserList = () => {
    let obj = {
      agrno: localStorage.getItem("agrno"),
      Email: localStorage.getItem("Email"),
      password: localStorage.getItem("Password"),
      ProjectId: localStorage.getItem("ProjectId"),
      SectionId: -1,
    };
    Cls.Json_GetForwardUserList(obj, (sts, data) => {
      if (sts) {
        if (data) {
          let json = JSON.parse(data);
          console.log("Json_GetForwardUserList", json);
          setselectManagers(json.Table);
        }
      }
    });
  };
  // const handleInputChange = (e) => {
  //   e.preventDefault();
  //   const { id, value } = e.target;
  //    id.split('-');
  //   console.log(e,"handleInputChang111111e");
  //   const data = id + ":" + value;
  //   console.log(data, "datahandlechange");
  //   setSelectedDatetest((prevData) => ({
  //     ...prevData,
  //     [id]: value,
  //   }));
  //     setDataFromChild(selectedDatetest);
  //   // setInputValue(value);
  //   // Perform any action with the changed value
  //   console.log("selectedDatetest", selectedDatetest);
  // };
  const handleInputChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    let spt = id.split('-');

    console.log(spt[0], "handleInputChang111111e1",e.target.value);
    const data = spt[0] + ":" + value;
    console.log(data, "datahandlechange");
    setSelectedDatetest((prevData) => ({
      ...prevData,
      [id]: value,
    }));
      setDataFromChild(selectedDatetest);
    // setInputValue(value);
    // Perform any action with the changed value
    console.log("selectedDatetest", selectedDatetest);
  };

  const handleInputOnDateChage= (e,vl) => { 
    

    // console.log(spt[0], "handleInputChang111111e");
    let date =  dayjs(e).format("YYYY/MM/DD");
    console.log(date,vl,"handleInputChang111111e");  
    setSelectedDatetest((prevData) => ({
      ...prevData,
      [vl]: date,
    }));
      // setDataFromChild(selectedDatetest);  
      console.log("selectedDatetestsonam",selectedDatetest);
  };
  const handleInputOnSelect= (e,vl) => { 
    
    const { id } = e.target;
    let spt = id.split('-');
    console.log(id,"handleInputOnSelect",vl);  
    const data = spt[0] + ":" + vl;
    console.log(data, "11handleInputOnSelect");
    setSelectedDatetest((prevData) => ({
      ...prevData,
      [spt[0]]: vl,
    }));
    //   // setDataFromChild(selectedDatetest);  
    //   console.log("selectedDatetestsonam",selectedDatetest);
  };
  useEffect(() => {
    Json_GetForwardUserList();
  }, []);
  useEffect(() => {
    setDataFromChild(selectedDatetest);
  }, [selectedDatetest]);
  console.log("selectedDatetestsonamoutside",selectedDatetest);
  const renderDynamicInput = (data) => {
    console.log(selectManager, "selectManagerselectManager");
    let renderedContent;
    switch (data?.UserDefFieldTypeID) {
      case 1:
        switch (data?.TextControlValue) {
          case "Integer":
            if (data && data.UdfValue) {
              <Grid item xs={6} md={6} className="mb-3">
                <TextField
                  fullWidth
                  label={data.Name}
                  variant="outlined"
                  name="regLine1"
                  id={
                    data.UserDefFieldID +
                    "_" +
                    data.UserDefFieldTypeID +
                    "_" +
                    data.TextControlValue +
                    "_UDF"
                  }
                  // value={data.UdfValue}
                  onChange={handleInputChange}
                />
              </Grid>;
            } else {
              <Grid item xs={6} md={6} className="mb-3">
                <TextField
                  fullWidth
                  label={data.Name}
                  variant="outlined"
                  name="regLine1"
                  id={
                    data.UserDefFieldID +
                    "_" +
                    data.UserDefFieldTypeID +
                    "_" +
                    data.TextControlValue +
                    "_UDF"
                  }
                  //   value={data.UdfValue}
                  onChange={handleInputChange}
                />
              </Grid>;
            }
            break;
          case "String":
            if (data && data.UdfValue) {
              renderedContent = (
                <Grid item xs={6} md={6} className="mb-3">
                  <TextField
                    fullWidth
                    label={data.Name}
                    variant="outlined"
                    name="regLine1"
                    id={
                      data.UserDefFieldID +
                      "_" +
                      data.UserDefFieldTypeID +
                      "_" +
                      data.TextControlValue +
                      "_UDF"
                    }
                    // value={data.UdfValue}
                    onChange={handleInputChange}
                  />
                </Grid>
              );
            } else {
              renderedContent = (
                <Grid item xs={6} md={6} className="mb-3">
                  <TextField
                    fullWidth
                    label={data.Name}
                    variant="outlined"
                    name="regLine1"
                    id={
                      data.UserDefFieldID +
                      "_" +
                      data.UserDefFieldTypeID +
                      "_" +
                      data.TextControlValue +
                      "_UDF"
                    }
                    //   value={data.UdfValue}
                    onChange={handleInputChange}
                  />
                </Grid>
              );
            }
            break;
          case "Date":
            if (data && data.UdfValue) {
              renderedContent = (
                <Grid item xs={6} md={6} className="mb-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={[
                      "DatePicker",
                      "TimePicker",
                      "DateTimePicker",
                      "DateRangePicker",
                    ]}
                  >
                   
                      <DatePicker 
                        // dateFormat="DD/MM/YYYY"
                        // value={currentDate}
                        id={
                          data.UserDefFieldID +
                          "_" +
                          data.UserDefFieldTypeID +
                          "_" +
                          data.TextControlValue +
                          "_UDF"
                        }
                       onChange={handleInputChange}
                      />
                    
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              );
            } else {
              renderedContent = (
                <Grid item xs={6} md={6} className="mb-3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        "DatePicker",
                        "TimePicker",
                        "DateTimePicker",
                        "DateRangePicker",
                      ]}
                    >
                     
                        <DatePicker 
                          // dateFormat="DD/MM/YYYY"
                          // value={currentDate}
                          id={
                            data.UserDefFieldID +
                            "_" +
                            data.UserDefFieldTypeID +
                            "_" +
                            data.TextControlValue +
                            "_UDF"
                          }
                           onChange={(e)=>handleInputOnDateChage(e,`${data.UserDefFieldID}_${data.UserDefFieldTypeID}_${data.TextControlValue}_UDF`
                          )}
                        />
                      
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              );
            }
            break;
          case "Memo":
            if (data && data.UdfValue) {
              renderedContent = (
                <Grid item xs={6} md={6} className="mb-3">
                  <TextField
                    fullWidth
                    label={data.Name}
                    variant="outlined"
                    name="regLine1"
                    id={
                      data.UserDefFieldID +
                      "_" +
                      data.UserDefFieldTypeID +
                      "_" +
                      data.TextControlValue +
                      "_UDF"
                    }
                    // value={data.UdfValue}
                    onChange={handleInputChange}
                  />
                </Grid>
              );
            } else {
              renderedContent = (
                <Grid item xs={6} md={6} className="mb-3">
                  <TextField
                    fullWidth
                    label={data.Name}
                    variant="outlined"
                    name="regLine1"
                    id={
                      data.UserDefFieldID +
                      "_" +
                      data.UserDefFieldTypeID +
                      "_" +
                      data.TextControlValue +
                      "_UDF"
                    }
                    //   value={data.UdfValue}
                    onChange={handleInputChange}
                  />
                </Grid>
              );
            }
            break;
          case "Decimal":
            if (data && data.UdfValue) {
              renderedContent = (
                <Grid item xs={6} md={6} className="mb-3">
                  <TextField
                    fullWidth
                    label={data.Name}
                    variant="outlined"
                    name="regLine1"
                    id={
                      data.UserDefFieldID +
                      "_" +
                      data.UserDefFieldTypeID +
                      "_" +
                      data.TextControlValue +
                      "_UDF"
                    }
                    // value={data.UdfValue}
                    onChange={handleInputChange}
                  />
                </Grid>
              );
            } else {
              renderedContent = (
                <Grid item xs={6} md={6} className="mb-3">
                  <TextField
                    fullWidth
                    label={data.Name}
                    variant="outlined"
                    name="regLine1"
                    id={
                      data.UserDefFieldID +
                      "_" +
                      data.UserDefFieldTypeID +
                      "_" +
                      data.TextControlValue +
                      "_UDF"
                    }
                    //   value={data.UdfValue}
                    onChange={handleInputChange}
                  />
                </Grid>
              );
            }
            break;
          case "Currency":
            if (data && data.UdfValue) {
              renderedContent = (
                <Grid item xs={6} md={6} className="mb-3">
                  <TextField
                    fullWidth
                    label={data.Name}
                    variant="outlined"
                    name="regLine1"
                    id={
                      data.UserDefFieldID +
                      "_" +
                      data.UserDefFieldTypeID +
                      "_" +
                      data.TextControlValue +
                      "_UDF"
                    }
                    // value={data.UdfValue}
                    onChange={handleInputChange}
                  />
                </Grid>
              );
            } else {
              renderedContent = (
                <Grid item xs={6} md={6} className="mb-3">
                  <TextField
                    fullWidth
                    label={data.Name}
                    variant="outlined"
                    name="regLine1"
                    id={
                      data.UserDefFieldID +
                      "_" +
                      data.UserDefFieldTypeID +
                      "_" +
                      data.TextControlValue +
                      "_UDF"
                    }
                    //   value={data.UdfValue}
                    onChange={handleInputChange}
                  />
                </Grid>
              );
            }
            break;
        }
        break;
      case 2:
        if (data.Options && typeof data.Options === "string") {
          const optionsArray = data.Options.split("@;");
          console.log(data,"optionsArray", `${data.UserDefFieldID}_${data.UserDefFieldTypeID}_UDF`);
          if (optionsArray.length > 0) {
            renderedContent = (
              <Grid item xs={6} md={6} className="mb-3">
                <Autocomplete

                 id={`${data.UserDefFieldID}_${data.UserDefFieldTypeID}_UDF`}
                  options={optionsArray} // Pass optionsArray as options
                 name={`${data.UserDefFieldID}_${data.UserDefFieldTypeID}_UDF`}
                  clearOnEscape
                  // value={data.UdfValue}
                  onChange={(event, value) => handleInputOnSelect(event, value)}

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      name={`${data.UserDefFieldID}_${data.UserDefFieldTypeID}_UDF`}
                      label={data.Name}
                    />
                  )}
                />
              </Grid>
            );
          }
        } else {
          renderedContent = (
            <Grid item xs={6} md={6} className="mb-3">
              <Autocomplete
                // options={optionsArray} // Pass optionsArray as options
                id={`${data.UserDefFieldID}_${data.UserDefFieldTypeID}_UDF`}
                clearOnEscape
                onChange={(event, value) => handleInputOnSelect(event, value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    name="Selectclient"
                    id={`${data.UserDefFieldID}_${data.UserDefFieldTypeID}_UDF`}
                    label={data.Name}
                  />
                )}
              />
            </Grid>
          );
      }
        break;
      case 10:
        // case "Boolean":
        if (data && data.UdfValue === "Boolean") {
          renderedContent = (
            <Grid item xs={6} md={6} className="mb-3">
              <FormControlLabel
                required
                control={
                  <Switch
                    id={
                      data.UserDefFieldID +
                      "_" +
                      data.UserDefFieldTypeID +
                      "_" +
                      data.TextControlValue +
                      "_UDF"
                    }
                    onChange={handleInputChange}
                  />
                }
                label={data.Name}
              />
            </Grid>
          );
        } else {
          renderedContent = (
           
            <Grid item xs={6} md={6} className="mb-3">
              <FormControlLabel
                required
                control={
                  <Switch
                    id={
                      data.UserDefFieldID +
                      "_" +
                      data.UserDefFieldTypeID +
                      "_" +
                      data.TextControlValue +
                      "_UDF"
                    }
                    onChange={handleInputChange}
                  />
                }
                label={data.Name}
              />
            </Grid>
          );
        }
        break;
      case 15:
        // case "ComboBox":
        if (data && data.UdfValue) {
          renderedContent = (
            <Grid item xs={6} md={6} className="mb-3">
              <Autocomplete
                options={selectManager} // Pass optionsArray as options
                id={`${data.UserDefFieldID}_${data.UserDefFieldTypeID}_UDF`}
                onChange={(event, value) => handleInputOnSelect(event, value)}
                clearOnEscape
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    name="selectManager"
                    label="Client List"
                  />
                )}
              />
            </Grid>
          );
        } else {
          renderedContent = (
            <Grid item xs={6} md={6} className="mb-3">
              <Autocomplete
                options={selectManager.map((option) => option.ForwardTo)} // Pass optionsArray as options
                id={`${data.UserDefFieldID}_${data.UserDefFieldTypeID}_UDF`}
                onChange={(event, value) => handleInputOnSelect(event, value)}
                clearOnEscape
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    name="Selectclient"
                    id={`${data.UserDefFieldID}_${data.UserDefFieldTypeID}_UDF`}
                    label={data.Name}
                  />
                )}
              />
            </Grid>
          );
        }
        break;
    }
    return renderedContent;
  };
  return (
    <>
      {Object.keys(data).length > 0 &&
        data?.Table.map((item, i) => {
          return (
            <Box className="row ">
              <Box>
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <h5 className="mb-3">{item.TagName}</h5>
                  {data?.Table3.map((udf, i) => {
                    if (item.TagId === udf.Tag) {
                      return (
                        <>
                          <Grid item xs={6} md={6}>
                            {renderDynamicInput(udf)}
                          </Grid>
                        </>
                      );
                    }
                  })}
                </Box>
              </Box>
            </Box>
          );
        })}
    </>
  );
});

export default UDFClientcard;
