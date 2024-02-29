import * as React from 'react';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import logo from "../images/logo.png";
import user from "../images/user.jpg";
import Button from '@mui/material/Button';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import CreateNewModal from './CreateNewModal';
import Client from '../client/Client';

import Badge from '@mui/material/Badge';

import { useAutocomplete } from '@mui/base/useAutocomplete';
import ClientDetails from '../client/client-components/ClientDetails';
import ContactDetails from '../contact/contact-components/ContactDetails';
import TodoList from './TodoList';

const options = ['Firefox', 'Google Chrome', 'Microsoft Edge', 'Safari', 'Opera'];

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
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(false);
  };

  const handleDrawerClose = () => {
    setOpen(true);
  };


  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete({
    id: 'controlled-state-demo',
    options,
    value,
    onChange: (event, newValue) => setValue(newValue),
    inputValue,
    onInputChange: (event, newInputValue) => setInputValue(newInputValue),
  });


  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);
  const opens2 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout=()=>{
    localStorage.clear();
    navigate("/");
  }
  return (
    <>
      <Box className='d-block d-md-flex'>
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
                <Box className="search-box ms-4">
                  <Layout>
                    <AutocompleteWrapper>
                      <AutocompleteRoot
                        sx={{
                          borderColor: '#D5D5D5',
                          color: 'success.main',
                        }}
                        {...getRootProps()}
                        className={focused ? 'Mui-focused' : ''}>
                        <span className="material-symbols-outlined search-icon">search</span>

                        <Input {...getInputProps()} placeholder='Search' className='ps-0' />
                      </AutocompleteRoot>
                      {groupedOptions.length > 0 && (
                        <Listbox {...getListboxProps()}>
                          {groupedOptions.map((option, index) => (
                            <Option {...getOptionProps({ option, index })}>{option}</Option>
                          ))}
                        </Listbox>
                      )}
                    </AutocompleteWrapper>
                  </Layout>
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

                    {/* <Menu
                      id="basic-menu3"
                      className='custom-dropdown'
                      anchorEl={anchorEl}
                      open={opens2}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button3',
                      }}
                    >
                      
                      <li className="dotification-list">
                        <Box className="notification-box">
                          <Box className="notification-box-img">
                            <img src={user} />
                          </Box>    
                          <Box className="notification-content">
                          <span className='notification-date'>10h ago</span>

                            <h4>Petrick Joy.</h4>
                            <p>lorem ipsome dolor site amer this is a dummy text world tours.</p>
                          </Box>
                        </Box>
                      </li>

                      <li className="dotification-list">
                        <Box className="notification-box">
                          <Box className="notification-box-img">
                            <img src={user} />
                          </Box>    
                          <Box className="notification-content">
                          <span className='notification-date'>10h ago</span>

                            <h4>Petrick Joy.</h4>
                            <p>lorem ipsome dolor site amer this is a dummy text world tours.</p>
                          </Box>
                        </Box>
                      </li>

                      <li className="dotification-list">
                        <Box className="notification-box">
                          <Box className="notification-box-img">
                            <img src={user} />
                          </Box>    
                          <Box className="notification-content">
                            <span className='notification-date'>10h ago</span>
                            <h4>Petrick Joy.</h4>
                            <p>lorem ipsome dolor site amer this is a dummy text world tours.</p>
                          </Box>
                        </Box>
                      </li>

                      <li className="dotification-list">
                        <Box className="notification-box">
                          <Box className="notification-box-img">
                            <img src={user} />
                          </Box>    
                          <Box className="notification-content">
                          <span className='notification-date'>10h ago</span>
                            <h4>Petrick Joy.</h4>
                            <p>lorem ipsome dolor site amer this is a dummy text world tours.</p>
                          </Box>
                        </Box>
                      </li>
                      
                    </Menu> */}

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
                          <Typography variant='h2'>Patrick Jo.</Typography>
                          <Typography variant='body1'>Admin</Typography>
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
                      <MenuItem onClick={()=>{
                        handleClose();
                        handleLogout();
                      }}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>

                    </Menu>
                  </Box>

                </Box>
              </Box>


              <Menu>
                {/* <MenuItem>Contacts</MenuItem> */}
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

            {[{tabLink:"/dashboard",tabName:'Dashboard'}, {tabLink:"/dashboard/TodoList",tabName:'To do list'}, {tabLink:"/dashboard/Connections",tabName:'Connections'}, {tabLink:"/dashboard/SmartViews",tabName:'Smart Views'}, {tabLink:"/dashboard/LogOut",tabName:'Log Out'}].map((text, index) => (
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => navigate(text.tabLink)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text.tabName} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {/* <Home/> */}

          <Routes>
            {/* <Route path="/" element={<Login/>}/> */}
            {/* <Route path="/" element={<Client />} /> */}
            <Route index element={<Client />} />
            <Route path="/clientDetails" element={<ClientDetails />} />
            <Route path="/ContactDetails" element={<ContactDetails />} />
            <Route path="/TodoList" element={<TodoList />} />

            
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
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
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
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
  }

  &[aria-selected=true] {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.base--focused,
  &.base--focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.base--focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &[aria-selected=true].base--focused,
  &[aria-selected=true].base--focusVisible {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
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