// // import React, { useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// //
// // import ButtonSubmit from '../Button/Button';
// // import { selectLoginError, signIn, setLoginError, selectStatus } from '../../store/slices/loginSlice';
// // import Loader from '../Loader/Loader';
// import React from "react";
// import {Grid} from "@mui/material";
// import {withStyles} from "@mui/sty";
//
// import loginStyles from "./loginStyles";
//
// function SignInForm({props}) {
//
//     const classes = props
//
//
//   // const [loginValue, setLoginValue] = useState('');
//   // const [passwordValue, setPasswordValue] = useState('');
//   //
//   // const status = useSelector(selectStatus);
//   // const error = useSelector(selectLoginError);
//   //
//   // const dispatch = useDispatch();
//   //
//   // const handleError = (active, message) => {
//   //   dispatch(setLoginError({ active: active, message: message }));
//   // };
//   //
//   // const handleLoginInput = (e) => {
//   //   setLoginValue(e.target.value.trim());
//   // };
//   //
//   // const handlePasswordInput = (e) => {
//   //   setPasswordValue(e.target.value.trim());
//   // };
//   //
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   handleError(false, '');
//   //   if (!loginValue.length || !passwordValue.length) {
//   //     handleError(true, 'Empty Values');
//   //     return;
//   //   }
//   //
//   //   dispatch(signIn({ login: loginValue, password: passwordValue }));
//   // };
//
//   return (
//       <Grid container component="main" className={classes.root}>
//         {/* <CssBaseline /> */}
//         <Grid item xs={false} sm={4} md={7} className={classes.image} />
//         {/* <div>1</div> */}
//       </Grid>
//     // <div className="signIn-form--container">
//     //   {error.active && <div className="login-error">{error.message}</div>}
//     //
//     //   <form className="signIn-form" onSubmit={handleSubmit}>
//     //     <input type="text" value={loginValue} onChange={handleLoginInput} />
//     //     <input type="password" value={passwordValue} onChange={handlePasswordInput} />
//     //
//     //     {status === 'loading' ? <Loader /> : <ButtonSubmit text={'Sign In'} />}
//     //   </form>
//     // </div>
//   );
// }
//
// export default withStyles(loginStyles)(SignInForm)

import React from 'react';
import { Box, TextField, Container, Button, Typography } from '@mui/material';

function SignInForm({ handleChange }) {
  const paperStyle = {
    // padding: 20,
    // height: '100%',
    // minHeight: '500px',
    // width: 400,
    // margin: '0 auto',
  };

  const btnstyle = {
    margin: '8px 0',
    color: '#fff',
  };

  const textFieldStyles = {
    margin: '10px 0 10px 0',
    // color: '#fff',
  };

  return (
    <Container>
      <Box style={paperStyle} variant="fullWidth">
        <TextField
          sx={{
            '& .MuiInputLabel-root': {
              color: '#fff',
            },
          }}
          inputProps={{
            style: {
              color: '#fff',
            },
          }}
          style={textFieldStyles}
          label="Username"
          variant="filled"
          placeholder="Enter username"
          color="secondary"
          fullWidth
          required
        />
        <TextField
          style={textFieldStyles}
          variant="filled"
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        />

        <Button type="submit" color="primary" variant="contained" style={btnstyle} fullWidth>
          Sign in
        </Button>

        <Typography>
          Do you have an account ?
          <Button style={btnstyle} onClick={() => handleChange('event', 1)}>
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Container>
  );
}

export default SignInForm;
