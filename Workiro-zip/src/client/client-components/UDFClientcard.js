/* eslint-disable default-case */
import { Box, Grid, TextField, Autocomplete, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommanCLS from "../../services/CommanService";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import dayjs from "dayjs";
const UDFClientcard = React.memo(({ data, setDataFromChild }) => {
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
  const handleInputChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    let spt = id.split("-");

    console.log(spt[0], "handleInputChang111111e1", e.target.value);
    const data = spt[0] + ":" + value;
    console.log(data, "datahandlechange");
    setSelectedDatetest((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setDataFromChild(selectedDatetest);
  };

  const handleInputOnDateChage = (e, vl) => {
    let date = dayjs(e).format("YYYY/MM/DD");
    console.log(date, vl, "handleInputChang111111e");
    setSelectedDatetest((prevData) => ({
      ...prevData,
      [vl]: date,
    }));
  };
  const handleInputOnSelect = (e, vl) => {
    const { id } = e.target;
    let spt = id.split("-");
    console.log(id, "handleInputOnSelect", vl);
    const data = spt[0] + ":" + vl;
    console.log(data, "11handleInputOnSelect");
    setSelectedDatetest((prevData) => ({
      ...prevData,
      [spt[0]]: vl,
    }));
  };
  useEffect(() => {
    Json_GetForwardUserList();
  }, []);
  useEffect(() => {
    setDataFromChild(selectedDatetest);
  }, [selectedDatetest]);
  console.log("selectedDatetestsonamoutside", selectedDatetest);
  const renderDynamicInput = (data) => {
    console.log(selectManager, "selectManagerselectManager",data);
    let renderedContent;
    switch (data?.UserDefFieldTypeID) {
      case 1:
        switch (data?.TextControlValue) {
          case "Integer":
            if (data && data.UdfValue) {
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

            } else {

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
              />;
            }
            break;
          case "String":
            if (data && data.UdfValue) {
              renderedContent = (

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
              );
            } else {
              renderedContent = (

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
              );
            }
            break;
          case "Date":
            if (data && data.UdfValue) {
              renderedContent = (

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
              );
            } else {
              renderedContent = (

                <LocalizationProvider dateAdapter={AdapterDayjs} className=''>
                  <DemoContainer
                    components={[
                      "DatePicker",
                      "TimePicker",
                      "DateTimePicker",
                      "DateRangePicker",
                    ]}
                    className=''
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
                      onChange={(e) => handleInputOnDateChage(e, `${data.UserDefFieldID}_${data.UserDefFieldTypeID}_${data.TextControlValue}}`)}
                    />

                  </DemoContainer>
                </LocalizationProvider>
              );
            }
            break;
          case "Memo":
            if (data && data.UdfValue) {
              renderedContent = (

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
              );
            } else {
              renderedContent = (

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
              );
            }
            break;
          case "Decimal":
            if (data && data.UdfValue) {
              renderedContent = (

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
              );
            } else {
              renderedContent = (

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
              );
            }
            break;
          case "Currency":
            if (data && data.UdfValue) {
              renderedContent = (

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
              );
            } else {
              renderedContent = (

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
              );
            }
            break;
        }
        break;
      case 2:
        if (data.Options && typeof data.Options === "string") {
          const optionsArray = data.Options.split("@;");
          console.log(
            data,
            "optionsArray",
            `${data.UserDefFieldID}_${data.UserDefFieldTypeID}_UDF`
          );
          if (optionsArray.length > 0) {
            renderedContent = (
              <Autocomplete
                id={`${data.UserDefFieldID}_${data.UserDefFieldTypeID}_UDF`}
                options={optionsArray} // Pass optionsArray as options
                name={`${data.UserDefFieldID}_${data.UserDefFieldTypeID}_UDF`}
                clearOnEscape
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
            );
          }
        } else {
          renderedContent = (

            <Autocomplete
              // options={optionsArray} // Pass optionsArray as options
              id={`${data.UserDefFieldID}_${data.UserDefFieldTypeID}_UDF`}
              clearOnEscape
              onChange={handleInputChange}
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
          );
        }
        break;
      case 10:
        // case "Boolean":
        if (data && data.UdfValue === "Boolean") {
          renderedContent = (
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
          );
        } else {
          renderedContent = (


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
          );
        }
        break;
      case 15:
        // case "ComboBox":
        if (data && data.UdfValue) {
          renderedContent = (
           
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
           
          );
        } else {
          renderedContent = (
        
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
            <Box sx={{ width: "100%", typography: "body1" }} className='mt-4 pt-2'>
              <h5 className="mb-2 boold  text-black">{item.TagName}</h5>

              <Grid className='mt-0 date-padding-0' container spacing={2}>
                {data?.Table3.map((udf, i) => {
                  if (item.TagId === udf.Tag) {
                    return (
                      <>
                        <Grid item xs={6} md={4}>
                          {renderDynamicInput(udf)}
                        </Grid>
                      </>
                    );
                  }
                })}
              </Grid>
            </Box>
          );
        })}
    </>
  );
});

export default UDFClientcard;
