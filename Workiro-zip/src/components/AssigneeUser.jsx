import * as React from "react";


import { useEffect } from "react";
import { useState } from "react";
import CommanCLS from "../services/CommanService";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Menu from "@mui/material/Menu";
import user from "../images/user.jpg";
export default function AssigneeUsers({selectedTask,setAddUser,addUser,setOwnerID,ownerID,Json_UpdateTaskField}) {
   // console.log("Attachment list11", selectedTask);
    const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
    const [password, setPassword] = useState(localStorage.getItem("Password"));
    const [Email, setEmail] = useState(localStorage.getItem("Email"));
    const [txtFolderId, setFolderId] = useState(selectedTask.FolderID);
    const baseUrl = "https://practicetest.docusoftweb.com/PracticeServices.asmx/"; // base url for api


    let cls = new CommanCLS(baseUrl, agrno, Email, password);



    const [ownerRighClick, setOwnerRighClick] = useState(null)
    const [userList, setUserList] = React.useState([]);
    const [userFilter, setUserFilter] = React.useState([]);
    const [userListData, setUserListData] = React.useState([]);
    const [filterText, setFilterText] = React.useState("");

    const [userDropdownanchorEl, setuserDropdownAnchorEl] = React.useState(null);
    const UserDropdownopen = Boolean(userDropdownanchorEl);

    const [userDropdownanchorElRight, setuserDropdownAnchorElRight] = React.useState(null);
    const UserDropdownopenRight = Boolean(userDropdownanchorElRight);

    const [dropdownVisible, setDropdownVisible] = useState(false);


    function Json_GetForwardUserList() {
       // setAddUser([])
        try {
            let o = {};
            o.ProjectId = txtFolderId;
            o.SectionId = "-1";
            cls.Json_GetForwardUserList(o, function (sts, data) {
                if (sts) {
                    let js = JSON.parse(data);
                    let dt = js.Table;
                    if (dt.length > 0) {
                        let result = dt.filter((el) => {
                            return el.CGroup !== "Yes";
                        });
                      
                        if (result.length > 0) {
                            result.map((el) => {
                                if (el.ID === selectedTask.OwnerID) {
                                     console.log("Json_GetForwardUserList11", addUser);
                                    setOwnerID(el.ID);
                                    setOwnerRighClick(el);
                                    setAddUser((pre) => [...pre, el])

                                }
                            })
                        }

                        setUserList(result);
                        let removeuser = result.filter((e) => e.ID !== selectedTask.OwnerID);
                        setUserListData(removeuser);
                        setUserFilter(removeuser);

                      setTimeout(() => {
                        if (selectedTask) {
                            let spt = selectedTask.AssignedToID.split(",");
                            let pushUser = [];
                            for (let i of spt) {
                               // console.log("user id print",i,result)
                                if (i) {
                                    for (let j of result) {
                                        if (parseInt(i) === j.ID) {
                                            pushUser.push(j);
                                        }
                                    }
                                }
                            }
                            //console.log("Json_Get_CRM_SavedTask_ByTaskId22", pushUser);
                            setAddUser(pushUser);
                        }
                      }, 3000);
                        
                       

                    }
                }
            });
        } catch (error) {
            console.log("error", error);
        }
    }

 

    useEffect(() => {
        setAgrNo(localStorage.getItem("agrno"));
        setFolderId(selectedTask.FolderID);
        setPassword(localStorage.getItem("Password"));
        setEmail(localStorage.getItem("Email"));
        Json_GetForwardUserList();

        

       

    }, [selectedTask])


    const handalClickAddUser = (e) => {
        // Check if the object 'e' already exists in the array based on its 'id'
        if (!addUser.some(user => user.ID === e.ID)) {
            // If it doesn't exist, add it to the 'addUser' array
            let myobj = [...addUser,e];
            let map = myobj.map((user)=>user.ID).join(', ');
            Json_UpdateTaskField("AssignedToID",map,`${e.ForwardTo} has been added as an assignee.`)
           // console.log(map);
            setAddUser([...addUser, e]);
            let res = userFilter.filter((user) => user.ID !== e.ID);
            setUserListData(res);
            setUserFilter(res);
            

        }


        // setTimeout(() => {
        //     console.log(addUser);
        // }, 2000);
    };


    let FilderDataList = userFilter.filter((item) => {
        // Check if item and its properties are defined before accessing them
        // console.log("filterText", filterText);
        if (item && item.ForwardTo) {
            // You can customize the filtering logic here based on your requirements
            return item.ForwardTo.toLowerCase().includes(filterText.toLowerCase());
        } else {
            return false; // Return false if any required property is undefined
        }
    });

   

    const handleUserClick = (event) => {
        setuserDropdownAnchorEl(event.currentTarget);
    };
    const handleUserClose = () => {
        setuserDropdownAnchorEl(null);
        setuserDropdownAnchorElRight(null)
    };

    const firsorScandCtr = (item) => {
        if (item) {
            const words = item.ForwardTo.split(" ");
            // Extract the first letter of each word and concatenate them
            let result = "";
            for (
                let i = 0;
                i < words.length && i < 2;
                i++
            ) {
                result += words[i].charAt(0);
            }
            return result;
        }

    }

    const handleRightClick = (event) => {
        console.log("right click",event)
        event.preventDefault(); // Prevents the default context menu from appearing
        setDropdownVisible(true);
        setuserDropdownAnchorElRight(event.currentTarget);
        //setDropdownPosition({ x: event.clientX, y: event.clientY });
    };


    const handleItemClick = (e) => {
        setOwnerRighClick(e);
        setOwnerID(e.ID)
        const existingObj = addUser.find(obj => obj.ID === e.ID);
        if (!existingObj) {
            setAddUser((pre) => [...pre, ...e]);
        }
        Json_UpdateTaskField("OwnerID",e.ID,`${e.ForwardTo} is now the task owner.`);
    };

    /////////////////////////////Remove Assignee
    const handleRemoveUser = (id) => {
        // Filter out the object with the specified ID
        const updatedUsers = addUser.filter(user => user.ID !== id);
        setAddUser(updatedUsers);

        // Find the object with the specified ID in userFilter
        const removedUser = addUser.find(user => user.ID === id);

        // If the object is found in userFilter, add it back to userFilter
        if (removedUser) {
            setUserFilter(prevUsers => [...prevUsers, removedUser]);
        }

        
        let map = updatedUsers.map((user)=>user.ID).join(', ');
        Json_UpdateTaskField("AssignedToID",map)


    };


    return (<>
        <div className="mt-2">
            <Button
                id="basic-button5"
                aria-controls={
                    UserDropdownopen ? "basic-menu5" : undefined
                }
                aria-haspopup="true"
                aria-expanded={UserDropdownopen ? "true" : undefined}
                onClick={handleUserClick}
                onContextMenu={handleRightClick}
                className="p-0 w-auto d-inline-block"


            >


                <Box className="d-flex align-items-center">
                    {ownerRighClick && (<>
                        <Box
                            className="user-img-list me-2 admin"
                            title={ownerRighClick.ForwardTo}
                            key={ownerRighClick.ID}
                        >
                            <p>{firsorScandCtr(ownerRighClick)}</p>
                        </Box> <ArrowForwardIosIcon className='me-1' />
                    </>)}

                    {addUser.length > 1
                        ? addUser.map((item) => {
                            const words = item.ForwardTo.split(" ");
                            // Extract the first letter of each word and concatenate them
                            let result = "";
                            for (
                                let i = 0;
                                i < words.length && i < 2;
                                i++
                            ) {
                                result += words[i].charAt(0);
                            }
                            if (item.ID !== ownerID) {
                                return (
                                    <>
                                        <Box
                                            className="user-img-list me-2 admin"
                                            title={item.ForwardTo}
                                            key={item.ID}
                                        >
                                            <p>{result}</p>
                                        </Box>


                                    </>
                                );
                            }


                        })
                        : null}

                    <Box className="d-flex">
                        <span class="material-symbols-outlined">
                            person_add
                        </span>
                    </Box>

                </Box>

            </Button>

            {dropdownVisible && (<Menu
                id="basic-menu5"
                anchorEl={userDropdownanchorElRight}
                open={UserDropdownopenRight}
                onClose={handleUserClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button5",
                }}
                className="user-list-dropdown"
            >

                <Box
                    className="inner-user-list-dropdown"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                    <p className="sembold">Transfer Ownership To:</p>

                    <Box className="box-user-list-dropdown">



                        {addUser
                            ? addUser.map((item, ind) => {
                                if (item.ID === ownerID) {
                                    return (
                                        <React.Fragment key={ind}>
                                            <button type="button"
                                                id={item.ID}
                                            >
                                                <Box className="user-img-list me-2">
                                                    <img src={user} alt="User" />
                                                </Box>
                                                <p>{item.ForwardTo}</p>
                                            </button>
                                        </React.Fragment>
                                    );
                                } else {
                                    return (
                                        <React.Fragment key={ind}>
                                            <button type="button" id={item.ID}
                                                onClick={() => handleItemClick(item)}
                                            >
                                                <Box className="user-img-list me-2">
                                                    <img src={user} alt="User" />
                                                </Box>
                                                <p>{item.ForwardTo}</p>
                                                {/* <span
                                                                                    className="close"
                                                                                    onClick={() => handleRemoveUser(item.ID)}
                                                                                    role="button" // Adding role="button" to indicate this element is clickable
                                                                                    tabIndex="0" // Adding tabIndex to make the element focusable
                                                                                >
                                                                                    <span className="material-symbols-outlined">
                                                                                        close
                                                                                    </span>
                                                                                </span> */}
                                            </button>
                                        </React.Fragment>
                                    );
                                }
                            })
                            : null}
                    </Box>
                </Box>
            </Menu>)}

            <Menu
                id="basic-menu5"
                anchorEl={userDropdownanchorEl}
                open={UserDropdownopen}
                onClose={handleUserClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button5",
                }}
                className="user-list-dropdown"
            >

                <Box
                    className="inner-user-list-dropdown"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                    <p className="sembold">Assigned</p>

                    <Box className="box-user-list-dropdown">



                        {addUser
                            ? addUser.map((item, ind) => {
                                if (item.ID === ownerID) {
                                    return (
                                        <React.Fragment key={ind}>
                                            <button type="button" id={item.ID} >
                                                <Box className="user-img-list me-2">
                                                    <img src={user} alt="User" />
                                                </Box>
                                                <p>{item.ForwardTo}</p>
                                            </button>
                                        </React.Fragment>
                                    );
                                } else {
                                    return (
                                        <React.Fragment key={ind}>
                                            <button type="button" id={item.ID}>
                                                <Box className="user-img-list me-2">
                                                    <img src={user} alt="User" />
                                                </Box>
                                                <p>{item.ForwardTo}</p>
                                                <span
                                                    className="close"
                                                    onClick={() => handleRemoveUser(item.ID)}
                                                    role="button" // Adding role="button" to indicate this element is clickable
                                                    tabIndex="0" // Adding tabIndex to make the element focusable
                                                >
                                                    <span className="material-symbols-outlined">
                                                        close
                                                    </span>
                                                </span>
                                            </button>
                                        </React.Fragment>
                                    );
                                }
                            })
                            : null}
                    </Box>
                </Box>

                <Box className="inner-user-list-dropdown">
                    <p className="sembold">My Team</p>

                    <Box className="box-user-list-dropdown" style={{ maxHeight: "200px", overflowY: "auto" }}>
                        <Box className="mb-1 mt-3 px-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                            />
                        </Box>
                        <Box className="box-user-list-dropdown">

                            {FilderDataList.map((item, ind) => (
                                <React.Fragment key={ind}>
                                    <button
                                        type="button"
                                        id={item.ID}
                                        onClick={() => handalClickAddUser(item)}
                                    >
                                        <Box className="user-img-list me-2">
                                            <img src={user} alt="User" />
                                        </Box>
                                        <p>{item.ForwardTo}</p>
                                        {/* <a href="" className="close">
                                    <span className="material-symbols-outlined">
                                      close
                                    </span>
                                  </a> */}
                                    </button>
                                </React.Fragment>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Menu>


        </div>
    </>)
}