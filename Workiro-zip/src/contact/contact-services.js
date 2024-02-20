import axios from "axios";

const apiUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
export const getContactsByFolder = async (folderID="1") => {
    let response = await axios.post(`${apiUrl}Json_GetContactListByFolder`,{
      agrno: "0261",
      Email: "nabs@docusoft.net",
      password: "ZG9jdXNvZnQ=",
      intFolderId: folderID
    });
    if(response?.data?.d !== ''){
      let res = JSON.parse(response?.data?.d);
      return res.Table;
    }
  }