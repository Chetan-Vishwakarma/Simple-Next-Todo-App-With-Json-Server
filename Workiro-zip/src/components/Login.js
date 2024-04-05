import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import API from '../services/APIsCall';
import Swal from 'sweetalert2';
import { json, useNavigate } from 'react-router-dom';
import CommanCLS from '../services/CommanService';
import logo from "../images/logo.png";
import animation from "../images/animation.gif";

import { v4 as uuidv4 } from 'uuid';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [details, setDetails] = React.useState();

  const baseUrl = "https://docusms.uk/dsdesktopwebservice.asmx/";// base url for api

  //let CLS =new API(baseUrl);// Call api 
  let CLS = new CommanCLS(baseUrl);


  /////////////////////////handalSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    let strEmail = document.getElementById("email").value;
    let strPassword = document.getElementById("password").value;
    console.log("kjhsfkj", strEmail, btoa(strPassword));
    const data = new FormData(event.currentTarget);
    // let obj = {
    //   Email: data.get('email'),
    //   password: btoa(data.get('password')),
    // }
    let obj = {
      Email: strEmail,
      password: btoa(strPassword),
    }
    setDetails(JSON.stringify(obj));
    // console.log({
    //   Email: data.get('email'),
    //   password: data.get('password'),
    // });
    LoginDetail(obj);
  };
  /////////////////////////end handalSubmit
  function LoginDetail(obj) {
    CLS.Call(JSON.stringify(obj), "Json_GetAgreementList", function (res) {
      if (res.d !== "Invalid") {
        let str = JSON.parse(res.d);
        let tbl = str.Table;
        console.log("response data", tbl);
        if (tbl.length > 0) {
          //let setEmaiPass = JSON.parse(obj);        
          localStorage.setItem("agrno", tbl[0].vAgreementNo);
          localStorage.setItem("IsAdmin", tbl[0].strIsAdmin);
          localStorage.setItem("UserId", tbl[0].intUserId);
          localStorage.setItem("Email", obj.Email);
          localStorage.setItem("Password", obj.password);
          GetAgreementList(obj, tbl[0].vAgreementNo);
          let strGuid = uuidv4().replace(/-/g, '');
          localStorage.setItem("GUID", strGuid)
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid username or password!',
          });
        }
      }
    })
  }
  const Json_getViewerToken = (obj) => {
    try {
      CLS.Call(JSON.stringify(obj), "Json_getViewerToken", function (res) {
        localStorage.setItem("ViewerToken", res.d);
        navigate("/dashboard/TodoList");
      });
    } catch (err) {
      console.log("Error while calling Json_getViewerToken", err);
    }
  }
  const GetAgreementList = (obj, agrno) => {
    obj.agrno = agrno;
    CLS.Call(JSON.stringify(obj), "Json_GetAccessToken", function (res) {
      localStorage.setItem("FolderId", res.d);
      localStorage.setItem("ProjectId", res.d);
      Json_getViewerToken(obj);
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>

      <Grid container spacing={2} className='mt-0'>
        <Grid item xs={6} md={6} className='d-flex align-items-center flex-column'>

          <Box className='login-head'>
            <img src={logo} />
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Box className='left-side-login'>
              <Box className='inner-left-side-bar mt-auto'>
                <Typography variant='h2' className='mb-3'>Login to your account</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Box className='d-flex align-items-center justify-content-between mb-2'>
                  <FormControlLabel
                    className='font-12'
                    control={<Checkbox value="remember" className="text-blue" />}
                    label="Remember me"

                  />
                  <Link href="#" variant="body2" className='font-14 text-decoration-none text-black'>
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  size="small"
                  sx={{ mt: 3, mb: 2 }}
                  className='btn-blue-2'
                >
                  Sign In
                </Button>

              </Box>
              <Box className='mt-auto'>
                <Copyright sx={{ mt: 2, mb: 2 }} />
                <Box className='text-center'>
                  <Link href="#" className='text-blue sembold px-3'>Terms & Condition</Link>
                  <Link href="#" className='text-blue sembold px-3'>Privacy Policy</Link>
                  <Link href="#" className='text-blue sembold px-3'>Help</Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} className='right-side-login'>
          <Box className='text-center'>
          {/* <h4 class="bold d-block">The Easiest Way to Build <br /> your Own Business</h4> */}
            <img src={animation} className='d-block img-fluid' />
          </Box>
        </Grid>
      </Grid>

      {/* <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container> */}
    </ThemeProvider>
  );
}