import axios from "axios";

const apiUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
export const getClientsByFolder = async (folderID = "1") => {
    let response = await axios.post(`${apiUrl}Json_GetClientsByFolder`,{
        agrno: "0261",
        Email: "nabs@docusoft.net",
        password: "ZG9jdXNvZnQ=",
        ProjectId: folderID
      });
    let res = JSON.parse(response?.data?.d);
    return res.Table1;
}