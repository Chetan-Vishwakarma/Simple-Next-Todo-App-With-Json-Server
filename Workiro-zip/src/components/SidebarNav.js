import React, { useState, useEffect, useMemo } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import logo from "../images/logo.png";
import user from "../images/user.jpg";
import Button from '@mui/material/Button';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CreateNewModal from './CreateNewModal';
import Client from '../client/Client';
import Badge from '@mui/material/Badge';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import ClientDetails from '../client/client-components/ClientDetails';
import ContactDetails from '../contact/contact-components/ContactDetails';
import TodoList from './TodoList';
import CommanCLS from '../services/CommanService';
import Logout from './Logout';
import NewTodoList from './NewTodoList';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchResult from './SearchResult';
import DocumentList from '../client/client-components/DocumentList';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupIcon from '@mui/icons-material/Group';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import AdvanceSearch from './AdvanceSearch';
import { useDispatch, useSelector } from "react-redux"
import { Json_AdvanceSearchDocFromRedux, fetchAllSection, fetchAllTasksRedux, fetchFolders } from '../redux/reducers/api_helper';


const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

let options = ['Firefox', 'Google Chrome', 'Microsoft Edge', 'Safari', 'Opera'];

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SidebarNav() {

  const location = useLocation();
  const dispatch = useDispatch();

  const {docDescriptions:documentsDescription} = useSelector(state=>state.counter.advanceSearchResult);
  const isAdvanceDocSearchRedux = useSelector((state)=>state.counter.isAdvanceDocSearchRedux);
  const taskSubjects = useSelector((state)=>state.counter.taskSubjects);

  const [testForNav,setTestForNav] = useState(false);
  const [agrno, setAgrNo] = useState(localStorage.getItem("agrno"));
  const [password, setPassword] = useState(localStorage.getItem("Password"));
  const [Email, setEmail] = useState(localStorage.getItem("Email"));
  const [folderId, setFolderId] = useState(localStorage.getItem("FolderId"));
  const [userId, setUserId] = useState(localStorage.getItem("UserId"));
  const [globalSearch, setGlobalSearch] = useState(localStorage.getItem("globalSearchKey"));

  const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";
  const baseUrlPractice = "https://practicetest.docusoftweb.com/PracticeServices.asmx/";
  let Cls = new CommanCLS(baseUrl, agrno, Email, password);
  let practiceCls = new CommanCLS(baseUrlPractice, agrno, Email, password);

  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleDrawerOpen = () => {
    setOpen(false);
  };

  const handleDrawerClose = () => {
    setOpen(true);
  };

  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [myDocuments, setMyDocuments] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [forDocuments, setForDocuments] = useState("");
  const [myTotalTasks, setMyTotalTasks] = useState([]);
  const [filteredTaskSubjects, setFilteredTaskSubjects] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(folderId);
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);
  const opens2 = Boolean(anchorEl);
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  }

  function Json_GetFolders() {
    let obj = {
      agrno: agrno,
      Email: Email,
      password: password
    }
    try {
      Cls.Json_GetFolders(obj, function (sts, data) {
        if (sts) {
          if (data) {
            let js = JSON.parse(data);
            let tbl = js.Table;
            // console.log("Json_GetFolders", tbl);
            setFolders(tbl);
          }
        }
      });
    } catch (err) {
      console.log("Error while calling Json_GetFolders", err);
    }
  }

  const Json_Get_CRM_UserByProjectId = () => {
    let obj = {
      agrno: agrno,
      Email: Email,
      password: password,
      ProjectId: folderId
    };
    Cls.Json_Get_CRM_UserByProjectId(obj, (sts, data) => {
      if (sts) {
        if (data) {
          let json = JSON.parse(data);
          json.Table.map((item) => {
            if (item.loggedInUser === "True") {
              setUserName(item.DisplayName);
              setUserEmail(item.Name);
            }
          });
        }
      }
    });
  }

  const [tabs, setTabs] = useState([{
    tabLink: "/dashboard", tabName: 'Dashboard', active: false, tabIcon: <DashboardIcon />
  }, { tabLink: "/dashboard/MyTask", tabName: 'My Tasks', active: false, tabIcon: <AccountBoxIcon /> }, { tabLink: "/dashboard/TodoList", tabName: 'To-do List', active: false, tabIcon: <AssignmentIcon /> }, { tabLink: "/dashboard/Connections", tabName: 'Connections', active: false, tabIcon: <GroupIcon /> }, { tabLink: "/dashboard/SmartViews", tabName: 'Smart Views', active: false, tabIcon: <ViewCarouselIcon /> },
    // { tabLink: "/dashboard/SearchResult?str=test", tabName: 'Search Result', active: false, tabIcon: <ContentPasteSearchIcon /> },
    // { tabLink: "/dashboard/AddContacts", tabName: 'Add Contacts', active: false, tabIcon: <PersonAddIcon /> },
  ]);
  const [searchInputForGlobalSearch, setSearchInputForGlobalSearch] = useState("");

  React.useEffect(() => {
    setAgrNo(localStorage.getItem("agrno"));
    setFolderId(localStorage.getItem("FolderId"));
    setPassword(localStorage.getItem("Password"));
    setEmail(localStorage.getItem("Email"));
    setUserId(localStorage.getItem("UserId"));
    Json_Get_CRM_UserByProjectId();
    dispatch(fetchAllSection());
    dispatch(fetchFolders());
    if(taskSubjects.length===0) dispatch(fetchAllTasksRedux("Todo"));
    // console.log("location Object",location.pathname.split("/").pop());
    tabs.length > 0 && tabs.map(itm => {
      if (itm.tabLink.split("/").pop() === location.pathname.split("/").pop()) {
        itm.active = true;
      } else {
        itm.active = false;
      }
    });
    if (window.location.pathname === "/dashboard/SearchResult" && tabs.every(itm => itm.tabName !== "Search Result")) {
      navigate("/dashboard/TodoList");
      tabs.length > 0 && tabs.map(itm => {
        if (itm.tabLink === "/dashboard/TodoList") {
          itm.active = true;
        } else {
          itm.active = false;
        }
      });
      // setTabs([...tabs, { tabLink: `/dashboard/SearchResult?str=${localStorage.getItem("globalSearchKey")}&folder=${localStorage.getItem("FolderId")}`, tabName: 'Search Result', active: true, tabIcon: <ContentPasteSearchIcon /> }]);
    } // when we load page on search result tab this functionality will work but it is only temp.
  }, []);

  const handleGlobalSearch = (val) => {
    setSearchInputForGlobalSearch(val);
    if (val === "") {
      setIsSearch(false);
    } else {
      setIsSearch(true);
    }
    setForDocuments(val);
    let fltTaskSubjects = taskSubjects.filter(itm => itm.toLowerCase().includes(val.toLowerCase()));
    setFilteredTaskSubjects(fltTaskSubjects);
  }

  useEffect(() => {
    const data = setTimeout(() => {
      dispatch(Json_AdvanceSearchDocFromRedux("",forDocuments,{}));
    }, 1000);
    return () => clearTimeout(data);
  }, [forDocuments]);


  function handleAdvNav(){
    setTabs([...tabs, { tabLink: `/dashboard/DocumentList?filter=true&adv=true`, tabName: 'Search Result', active: true, tabIcon: <ContentPasteSearchIcon /> }]);    
    tabs.map(itm => {
      itm.active = false;
    });
  }

  // dropdown
  const open4 = Boolean(anchorEl4);
  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };
  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  useEffect(() => {
    setGlobalSearch(localStorage.getItem("globalSearchKey"));
    tabs.map(itm => {
      if (itm.tabName === "Search Result" && testForNav===true) {
          itm.tabLink = `/dashboard/SearchResult?str=${localStorage.getItem("globalSearchKey")}&folder=${folderId}`;
      } else {
        itm.tabLink = itm.tabLink;
      }
    });
    
    
    // setTabs([...tabs,{ tabLink: `/dashboard/SearchResult?str=${localStorage.getItem("globalSearchKey")}&folder=${folderId}`, tabName: 'Search Result', active: true, tabIcon: <ContentPasteSearchIcon /> }]);

  }, [globalSearch, window.location.pathname]);

  useMemo(()=>{
    if(isAdvanceDocSearchRedux){
      setTabs([...tabs, { tabLink: `/dashboard/DocumentList`, tabName: 'Search Result', active: true, tabIcon: <ContentPasteSearchIcon /> }]);
      tabs.map(itm => {
        itm.active = false;
      });
    }
  },[isAdvanceDocSearchRedux]);

  return (
    <>
      <Box className='d-block d-md-flex' onClick={() => setIsSearch(false)}>
        <CssBaseline />
        <AppBar className='header' position="fixed" open={open} color='inherit'>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Box className="w-100">

              <Box className="d-flex align-items-center justify-content-between w-100">

                <Box className='d-flex flex-wrap align-items-center'>
                  <Box className="search-box ms-3 me-2">
                    <Layout>
                      <AutocompleteWrapper>
                        <AutocompleteRoot
                          sx={{
                            borderColor: '#D5D5D5',
                            color: 'success.main',
                          }}
                          className={isSearch ? 'Mui-focused' : ''}>
                          <span className="material-symbols-outlined search-icon">search</span>

                          <form onSubmit={(e) => {
                            localStorage.setItem("globalSearchKey", searchInputForGlobalSearch);
                            const isAlready = tabs.map(itm => itm.tabName).some(item => item === "Search Result");
                            if (!isAlready) {
                              setTabs([...tabs, { tabLink: `/dashboard/SearchResult?str=${globalSearch}&folder=${folderId}`, tabName: 'Search Result', active: true, tabIcon: <ContentPasteSearchIcon /> }]);
                            }
                            e.preventDefault();
                            navigate(`/dashboard/SearchResult?str=${forDocuments}&folder=${selectedFolder}`);
                            setIsSearch(false);
                            tabs.map(itm => {
                              if (itm.tabName === "Search Result") {
                                itm.active = true;
                              } else {
                                itm.active = false;
                              }
                            });
                            setSearchInputForGlobalSearch("");
                            setTestForNav(true);
                          }} 
                          className='w-100'>
                            <Input
                              onChange={(e) => handleGlobalSearch(e.target.value)}
                              // onBlur={() => setIsSearch(false)}
                              value={searchInputForGlobalSearch}
                              placeholder='Search for Tasks or Documents'
                              className='ps-0  w-100' />
                          </form>

                        </AutocompleteRoot>

                        {isSearch && <Listbox sx={{ zIndex: 1 }}>

                          {filteredTaskSubjects.length > 0 && filteredTaskSubjects.slice(0.20).map((itm, i) => {
                            return <Option key={i} onClick={(e) => {
                              e.stopPropagation();
                              setIsSearch(false);
                              navigate(`/dashboard/SearchResult?str=${itm}&folder=${selectedFolder}`);
                              setSearchInputForGlobalSearch(itm);
                              tabs.map(itm => {
                                if (itm.tabName === "Search Result") {
                                  itm.active = true;
                                } else {
                                  itm.active = false;
                                }
                              });
                            }}>
                              <FormatListNumberedRtlIcon className='me-1' />
                              {itm}</Option>
                          })}

                          {documentsDescription.length > 0 && documentsDescription.slice(0, 20).map((itm, i) => {
                            return <Option key={i} onClick={(e) => {
                              e.stopPropagation();
                              setIsSearch(false);
                              navigate(`/dashboard/SearchResult?str=${itm}&folder=${selectedFolder}`);
                              setSearchInputForGlobalSearch(itm);
                              tabs.map(itm => {
                                if (itm.tabName === "Search Result") {
                                  itm.active = true;
                                } else {
                                  itm.active = false;
                                }
                              });
                            }}>
                              <DescriptionIcon className='me-1' />
                              {itm}</Option>
                          })}

                        </Listbox>}

                      </AutocompleteWrapper>
                    </Layout>
                  </Box>

                  <div>
                    <AdvanceSearch folderList={folders} handleAdvNav={handleAdvNav} setTestForNav={setTestForNav}/>
                  </div>

                </Box>

                <Box className="d-flex align-items-center">
                  <Box>
                    <Button
                      id="basic-button3"
                      aria-controls={opens2 ? 'basic-menu3' : undefined}
                      aria-haspopup="true"
                      aria-expanded={opens2 ? 'true' : undefined}
                      onClick={handleClick}
                    >

                      <Badge badgeContent={4} color="primary" sx={{ "& .MuiBadge-badge": { top: 3, right: 4, fontSize: 11, backgroundColor: '#F93C65', height: 18, minWidth: 16 } }}>
                        <span className="material-symbols-outlined">
                          notifications
                        </span>
                      </Badge>

                    </Button>

                  </Box>



                  <Box>
                    <Button
                      id="basic-button2"
                      aria-controls={opens ? 'basic-menu2' : undefined}
                      aria-haspopup="true"
                      aria-expanded={opens ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      <Box className="d-flex align-items-center user-dropdown">
                        <Box className="user-img me-2">
                          <img src={user} />
                        </Box>
                        <Box className="user-content text-start">
                          <Typography variant='h2'>{userName}</Typography>
                          <Typography variant='body1'>{userEmail}</Typography>
                        </Box>
                      </Box>
                    </Button>


                    <Menu
                      id="basic-menu2"
                      className='custom-dropdown'
                      anchorEl={anchorEl}
                      open={opens}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button2',
                      }}
                    >

                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        My Account
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                      </MenuItem>
                      <MenuItem onClick={() => {
                        handleClose();
                        handleLogout();
                      }}>
                        <ListItemIcon>
                          <ExitToAppIcon fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>

                    </Menu>
                  </Box>

                </Box>
              </Box>
              <Menu>
              </Menu>
            </Box>

          </Toolbar>
        </AppBar>
        {/* header end */}

        <Drawer variant="permanent" className='left-sidebar' open={open}>
          <DrawerHeader className='d-none'>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <Box className="text-center">
            <a href='#' className='logo'><img src={logo} /></a>
          </Box>

          <CreateNewModal></CreateNewModal>

          <List className='side-navi'>
            {console.log("fsdfkretgsg",tabs)}
            {tabs.map((text, index, arr) => (
              <ListItem className={text.active ? 'active' : ''} key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => {
                    navigate(text.tabLink);
                    let test = tabs.map((item) => {
                      if (item.tabName === text.tabName) {
                        item.active = true;
                      } else {
                        item.active = false;
                      }
                      return item;
                    })
                    setTabs(test);
                    // setTabs(tabs.map(()))
                  }}
                >

                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                    }}
                  >


                    <BootstrapTooltip title={text.tabName} arrow
                      placement="bottom-start"
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: 'offset',
                              options: {
                                offset: [0, 5],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      {text.tabIcon}
                    </BootstrapTooltip>

                  </ListItemIcon>

                  <ListItemText primary={text.tabName} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem className={''} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => {
                  navigate("/dashboard/LogOut");
                }}
              >

                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >


                  <BootstrapTooltip title={"Logout"} arrow
                    placement="bottom-start"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: 'offset',
                            options: {
                              offset: [0, 5],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <LogoutIcon />
                  </BootstrapTooltip>

                </ListItemIcon>

                <ListItemText primary={"Log Out"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {/* <Home/> */}

          <Routes>
            {/* <Route path="/" element={<Login/>}/> */}
            {/* <Route path="/" element={<Client />} /> */}
            <Route index element={<h1></h1>} />
            <Route path="/Connections" element={<Client />} />
            <Route path="/clientDetails" element={<ClientDetails />} />
            <Route path="/ContactDetails" element={<ContactDetails />} />
            <Route path="/MyTask" element={<TodoList />} />
            <Route path="/TodoList" element={<NewTodoList />} />
            {/* <Route path="/AddContacts" element={<AddContacts />} /> */}
            <Route path="/SmartViews" element={<></>} />
            <Route path="/SearchResult" element={<SearchResult myTotalTasks={myTotalTasks} myDocuments={myDocuments} />} />
            <Route path="/DocumentList" element={<DocumentList clientId="" />} />
            <Route path="/LogOut" element={<Logout />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const AutocompleteWrapper = styled('div')`
      position: relative;
      `;

const AutocompleteRoot = styled('div')(
  ({ theme }) => `
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 400;
      border-radius: 8px;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };
      display: flex;
      gap: 5px;
      padding-right: 5px;
      overflow: hidden;
      width: 320px;

      &.Mui-focused {
        border - color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

      &:hover {
        border - color: ${blue[400]};
  }

      &:focus-visible {
        outline: 0;
  }
      `,
);

const Input = styled('input')(
  ({ theme }) => `
      font-size: 0.875rem;
      font-family: inherit;
      font-weight: 400;
      line-height: 1.5;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      background: inherit;
      border: none;
      border-radius: inherit;
      padding: 8px 12px;
      outline: 0;
      flex: 1 0 auto;
      `,
);

const Listbox = styled('ul')(
  ({ theme }) => `
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      box-sizing: border-box;
      padding: 6px;
      margin: 12px 0;
      max-width: 320px;
      border-radius: 12px;
      overflow: auto;
      outline: 0px;
      max-height: 300px;
      z-index: 1;
      position: absolute;
      left: 0;
      right: 0;
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
      `,
);

const Option = styled('li')(
  ({ theme }) => `
      list-style: none;
      padding: 8px;
      border-radius: 8px;
      cursor: default;

      &:last-of-type {
        border - bottom: none;
  }

      &:hover {
        cursor: pointer;
  }

      &[aria-selected=true] {
        background - color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

      &.base--focused,
      &.base--focusVisible {
        background - color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

      &.base--focusVisible {
        box - shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

      &[aria-selected=true].base--focused,
      &[aria-selected=true].base--focusVisible {
        background - color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
      color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
      `,
);

const Layout = styled('div')`
      display: flex;
      flex-flow: column nowrap;
      gap: 4px;
      `;

const Pre = styled('pre')(({ theme }) => ({
  margin: '0.5rem 0',
  fontSize: '0.75rem',
  '& code': {
    backgroundColor: theme.palette.mode === 'light' ? grey[100] : grey[900],
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? grey[300] : grey[700],
    color: theme.palette.mode === 'light' ? '#000' : '#fff',
    padding: '0.125rem 0.25rem',
    borderRadius: 3,
  },
}));