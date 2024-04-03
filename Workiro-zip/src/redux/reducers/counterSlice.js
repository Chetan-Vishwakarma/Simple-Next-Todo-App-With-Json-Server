import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const counterSlices = createSlice({
    name: "counter",
    initialState: {
        userDetail: {
            Clientname: "",
            Clientid: "",
            Mobile: "",
            Telephone: "",
            Line1: "",
            Line2: "",
            Line3: "",
            Town: "",
            MCounty: "",
            Postcode: "",
            BilLine1: "",
            BilLine2: "",
            BilLine3: "",
            BilTown: "",
            BilCountry: "",
            BilPostcode: "",
            regLine1: "",
            regLine2: "",
            regLine3: "",
            regTown: "",
            regCountry: "",
            regPostcode: "",
            Selectclient: "",
            Selectteamsa: "",
            addDetails: "",
            mainAddress: "",
            biliAddress: "",
            regAddress: "",
            fullAddress: "",
            Bussiness: "",
            Status: "",
            Source: "",
            Manager: "",
            Email: "",
            folderId: localStorage.getItem("FolderId"),
            BussId: -1,
            UserId: -1,
            SourceId: -1,
            StatusId: -1,
            Title: "",
            FirstName: "",
            LastName: "",
            ReferenceName: "",
            MainContact: false,
            Inactive: false,
            GreetingName: "",
            EmailName: "",
            MainUserId: -1,
            MainLine1Name: "",
            MainLine2Name: "",
            MainLine3Name: "",
            MainTownName: "",
            MainPostcodeName: "",
            Maincontactcountry: "",
            MainTelephoneName: "",
            MainMobileName: "",
            mainCountry: "",
            billingsCountry: "",
            ragistersCountry: "",
            CHNumber: ""
          },
        dataCompanyHouse: null,
        selectedFolderID: null    
    },
    reducers: {
        //sonam state
        setUserDetail: (state, action) => {
            state.userDetail = action.payload;
          },
          setDataCompanyHouse: (state, action) => {
            state.dataCompanyHouse = action.payload;
          },
          setSelectedFolderID: (state, action) => {
            state.selectedFolderID = action.payload;
          },
    }
});

export const { setUserDetail, setDataCompanyHouse, setSelectedFolderID } = counterSlices.actions;

// export const getUsers = () => async(dispatch) => {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//     dispatch(users(response.data));
// }

export default counterSlices.reducer;