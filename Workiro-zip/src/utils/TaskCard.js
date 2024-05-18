import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Menu, MenuItem, Radio } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { updateTaskFieldFromRedux } from '../redux/reducers/api_helper';
import { useDispatch } from 'react-redux';
import TaskDetailModal from '../components/TaskDetailModal';
import CommanCLS from '../services/CommanService';
import moment from 'moment';
const agrno = localStorage.getItem("agrno");
const password = localStorage.getItem("Password");
const Email = localStorage.getItem("Email");

const baseUrlPractice = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
let Cls = new CommanCLS(baseUrlPractice, agrno, Email, password);

const baseUrlPortal = "https://portal.docusoftweb.com/clientservices.asmx/";
let ClsPortal = new CommanCLS(baseUrlPortal, agrno, Email, password);

const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
let ClsSms = new CommanCLS(baseUrl, agrno, Email, password);

function TaskCard({ item, index }) {

    const dispatch = useDispatch();
    const [isApi, setIsApi] = useState(false);
    const [userList, setUserList] = React.useState([]);
    const [selectedTask, setSelectedTask] = useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openModal, setOpen] = React.useState(false);  //for task detail modal
    const [attachmentFileTodo, setAttachmentFileTodo] = useState([]);
    // const [addUser, setAddUser] = useState([]);
    const handleClickOpen = (task = selectedTask) => {
        setSelectedTask(task);
        setOpen(true);
    };

    const FiterAssinee = (ownerid) => {
        let res = userList.filter((e) => e.UserId === ownerid);
        if (res.length > 0) {
            return res[0].UserName;
        }
    }

    function Json_GetForwardUserList() {
        try {
            let o = {};
            o.agrno = agrno;
            o.Email = Email;
            o.Password = password;
            ClsSms.GetInternalUserList(o, function (sts, data) {
                if (sts) {
                    if (data) {
                        let js = JSON.parse(data);
                        let { Status, Message } = js;
                        if (Status === "Success") {
                            let tbl = Message.Table;
                            setUserList(tbl);
                        }
                    }
                }
            });
        } catch (error) {
            console.log("error", error);
        }
    }

    function startFormattingDate(dt) {
        const date = new Date(dt);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        return formattedDate === "Invalid Date" ? " " : formattedDate;
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        // setAnchorEl(event.currentTarget);
    };

    function addToWorkTable(Itid, e) {
        let obj = { agrno: agrno, Email: Email, password: password, ItemId: Itid, comment: `${e["Forwarded By"]} has completed  a task-${e.Subject} . Task ID : ${e.ID}` };
        ClsSms.Json_AddToWork(obj, function (status, data) {
            if (status) {
                if (data) {
                }
            }
        });
    }

    const GetMessageAttachments_Json = (mgsId, e) => {
        let o = {
            accid: agrno,
            email: Email,
            password: password,
            messageId: mgsId,
        };
        ClsPortal.GetMessageAttachments_Json(o, function (sts, data) {
            if (sts && data) {
                let arrayOfObjects = JSON.parse(data);
                if (arrayOfObjects && arrayOfObjects.length > 0) {
                    setAttachmentFileTodo(arrayOfObjects);
                    if (e.Source === "Portal") {
                        arrayOfObjects.forEach((item) => {
                            if (item.ItemID) {
                                addToWorkTable(item.ItemID, e);
                            }
                        });
                    }
                }
            }
        });
    }
    const Json_SendMail = (taskID,addUser) => {
        if(taskID.ID){
            if(addUser && addUser.length > 0) {
                addUser.forEach(item => {
                    let obj={};
                    obj.Subject =`Docusoft Task ${taskID.Client}`;
                    obj.Body = `Hi ${item?.UserName},<br><br>
                    ${taskID["Forwarded By"]} has initiated a task relating to ${taskID.Client} and you have been added as an assignee.<br><br>
                    Task: ${taskID.Subject}<br>
                    Task ID: ${taskID.ID}<br>
                    Start Date: ${moment(taskID.Start).format("DD/MM/YYYY")
                }<br><br>
                    Please click on the following link to upload:<br>
                    Open Upload Page <a href="${window.location.protocol+"//"+window.location.hostname+":"+window.location.port}/dashboard/MyTask">Open Task!</a>`;
                    obj.FromMail = Email;
                    obj.ToEmail = item?.UserEmail;
                    obj.strFileName = "";
                    obj.Byte = null;
                    console.log(obj,"sendmail_object data",addUser);
                    Cls.NewSendMail(obj, function (sts, data) {
                        if (sts) {
                            if (data) {
                                console.log(data,"SendMail by sonam");
                            }
                        }
                    });
                });
            }
           
        }
      
    }
    const Json_GetAssigneeListByTaskId = (taskID) => {
        let obj = {};
        obj.AgrNo = agrno;
        obj.Email = Email;
        obj.Password = password;
        obj.taskId = taskID.ID;
        Cls.GetAssigneeListByTaskId(obj, function (status, data) {
            if (status && data) {
                let json = JSON.parse(data);
                console.log(status,"statusdata",taskID);
                if(json && json.length > 0) {
                    //setAddUser(json);
                    Json_SendMail(taskID,json);
                }
            }
        });
    }
    const MarkComplete = (e) => {
        Cls.ConfirmMessage1("Are you sure you want to complete task", function (res) {
            if (res) {
                const checkbox = document.getElementById('myCheckbox');
                const notifyAssignees = checkbox ? checkbox.checked : false;
                console.log(e,'NotifySonam Assignees:', notifyAssignees);
                if(notifyAssignees==true){
                       //pending by sonam
                       Json_GetAssigneeListByTaskId(e);
                }
                console.log(res,"markcompleted");
                dispatch(updateTaskFieldFromRedux("Status", "Completed", e));
                try {
                    let obj = {};
                    obj.TaskId = e.ID;
                    Cls.Json_Get_CRM_SavedTask_ByTaskId(obj, function (status, data) {
                        if (status && data) {
                            let json = JSON.parse(data);
                            let table6 = json.T6;
                            if (table6 && table6.length > 0) {
                                table6.forEach((item) => {
                                    addToWorkTable(item.ItemId, e);
                                });
                            } else {

                            }
                        }
                    });
                } catch (e) { }
                try {
                    if (e.Source === "Portal") {
                        GetMessageAttachments_Json(e.PubMessageId, e);
                    }
                } catch (e) { }
            }
        })
    }

    const FilterAgs = (item) => {
        const arr = item.AssignedToID.split(",").filter(Boolean).map(Number);
        const filteredIds = arr.filter((k) => k !== item.OwnerID);
        let userFilter = []; // Initialize an empty array to store filtered users
        if (filteredIds.length > 0) {
            userFilter = userList.filter((user) => filteredIds.includes(user.UserId));
            // Filter userList to include only those users whose UserId is present in filteredIds
        }
        return userFilter && userFilter.length > 0 ? userFilter : "";
    }

    const arr = item.AssignedToID.split(",").filter(Boolean).map(Number);
    let userName = FilterAgs(item);

    useEffect(() => {
        Json_GetForwardUserList();
    }, []);

    return (
        <>

            <TaskDetailModal setIsApi={setIsApi} isApi={isApi} selectedTask={selectedTask} setOpen={setOpen} openModal={openModal} attachmentFileTodo={attachmentFileTodo}></TaskDetailModal>

            <Box key={index} className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex'>
                <Box className='todo-list-box white-box relative w-100' onDoubleClick={() => handleClickOpen(item)}>

                    <Box className='check-todo'>
                        {/* <Badge color="primary" className='custom-budget' badgeContent={0} showZero>
                                                    <AttachFileIcon />
                                                </Badge> */}
                        <Radio className={item.Priority === 1 ? 'text-red' : item.Priority === 2 ? 'text-green' : 'text-grey'} checked
                            sx={{
                                '&.Mui-checked': {
                                    color: "secondary",
                                },
                            }}
                            size='small'
                        />
                    </Box>

                    <Typography variant='subtitle1 mb-4 d-block'><strong>Type:</strong> {item.Source}</Typography>

                    <Typography variant='h2' className='mb-2'>{item.Subject}</Typography>

                    <Box className='d-flex align-items-center justify-content-between'>
                        <Typography variant='subtitle1'><pan className='text-gray'>
                            {FiterAssinee(item.OwnerID)} {arr.length > 1 && (<ArrowForwardIosIcon className='font-14' />)} </pan>
                            {/* <a href='#'>Patrick</a>, */}
                            <a href='javascript:void(0)'>{userName && userName.length > 0 ? userName[0].UserName : ""}</a> <a href='javascript:void(0)'> {arr.length > 2 && (<>
                                +{arr.length - 2}
                            </>)}</a></Typography>
                        <Typography variant='subtitle1 sembold'>{item["CreationDate"] ? (startFormattingDate(item["CreationDate"])) : ""}</Typography>
                    </Box>

                    <Box className='d-flex align-items-center justify-content-between'>
                        <Typography variant='subtitle1'>{item.Client}</Typography>
                        <Typography variant='subtitle1'>
                            <Box>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className='font-14'
                                    sx={{
                                        color: item.mstatus === "Completed" ? "green" : "primary"
                                    }}
                                >
                                    {item.mstatus}
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    className='custom-dropdown'
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <PriorityHighIcon />
                                        High</MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <ReportProblemIcon />
                                        Medium</MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <ArrowDownwardIcon />
                                        Low</MenuItem>
                                </Menu>
                            </Box>
                        </Typography>
                    </Box>

                    <Box className='mt-2'>
                        <Button variant="text" disabled={item.mstatus === "Completed"} className='btn-blue-2 me-2' onClick={() => MarkComplete(item)} >Mark Complete</Button>
                        <DateRangePicker initialSettings={{
                            singleDatePicker: true,
                            showDropdowns: true,
                            startDate: item["EndDateTime"],
                            minYear: 1901,
                            maxYear: 2100,
                        }}
                            onCallback={(start) => {
                                const date = start.format('YYYY/MM/DD');
                                dispatch(updateTaskFieldFromRedux("EndDateTime", date, item));
                            }}
                        >
                            <Button variant="outlined" className='btn-outlin-2'>
                                Defer
                            </Button>
                        </DateRangePicker>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default TaskCard
