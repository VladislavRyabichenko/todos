import React, { FunctionComponent } from 'react';
import { TextField, Stack, FormControl, FormHelperText, Box, CircularProgress } from '@mui/material';
import useStyles from './styles/SignInExtraStyles';
import { useManageSignIn } from './manageSignInHook/useManageSignIn';
import { STATUS_LOADING } from '../../../constants/values';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Container from '../../UI/Container';
import Flex from '../../UI/Flex';
import Input from '../../UI/Input';
import Button from '../../UI/Button';

const SignInForm = () => {
  const { loginValue, handleLoginInput, passwordValue, handlePasswordInput, handleSubmit, status, error } =
    useManageSignIn({
      initialLogin: '',
      initialPassword: '',
      useDispatch: useAppDispatch,
      useSelector: useAppSelector,
    });

  return (
    <Flex direction="column" width="100%" data-testid="test-sign-in-wrapper">
      <form onSubmit={handleSubmit} data-testid="test-sign-in-form" style={{ height: '100%' }}>
        <Flex direction="column" justify="space-between" height="100%">
          <Flex direction="column">
            <Input
              width="100%"
              height="50px"
              placeholder="Login"
              value={loginValue}
              onChange={handleLoginInput}
              isRequired={true}
              data-testid="test-sign-in-field-login"
            />
          </Flex>
          <Flex direction="column">
            <Input
              type="password"
              width="100%"
              height="50px"
              placeholder="Password"
              value={passwordValue}
              onChange={handlePasswordInput}
              isRequired={true}
              data-testid="test-sign-in-field-password"
            />
          </Flex>
          {error.active && (
            <Container data-testid="test-helper-text-sign-in">
              <span>{error.message || 'Something went wrong...'}</span>
            </Container>
          )}
          <Flex justify="center">
            {status === STATUS_LOADING ? (
              <CircularProgress color="success" data-testid="test-loader-component" />
            ) : (
              <Button text="SIGN IN" height="40px" width="50%" data-testid="test-sign-in-button" />
            )}
          </Flex>
        </Flex>
      </form>
    </Flex>
    // <Box data-testid="test-sign-in-wrapper">
    //   <form onSubmit={handleSubmit} data-testid="test-sign-in-form">
    //     <FormControl fullWidth={true} error={error.active} aria-describedby="my-helper-text">
    //       <Stack spacing={1}>
    //         <TextField
    //           data-testid="test-sign-in-field-login"
    //           id="login-field"
    //           label="Username"
    //           variant="outlined"
    //           placeholder="Enter username"
    //           inputProps={{
    //             style: {
    //               color: 'whitesmoke',
    //             },
    //           }}
    //           className={classes.textField}
    //           // required
    //           fullWidth
    //           value={loginValue}
    //           onChange={handleLoginInput}
    //         />
    //         <FormHelperText id="my-helper-text">{''}</FormHelperText>
    //
    //         <TextField
    //           id="pass-field"
    //           data-testid="test-sign-in-field-password"
    //           aria-describedby="my-helper-text"
    //           label="Password"
    //           variant="outlined"
    //           placeholder="Enter username"
    //           inputProps={{
    //             type: 'password',
    //             style: {
    //               color: 'whitesmoke',
    //             },
    //           }}
    //           className={classes.textField}
    //           fullWidth
    //           // required
    //           value={passwordValue}
    //           onChange={handlePasswordInput}
    //         />
    //
    //         {error.active && (
    //           <FormHelperText id="my-helper-text" data-testid="test-helper-text-sign-in" className={classes.helpText}>
    //             {error.message || 'Something went wrong...'}
    //           </FormHelperText>
    //         )}
    //
    //         {status === STATUS_LOADING ? (
    //           <CircularProgress color="success" data-testid="test-loader-component" />
    //         ) : (
    //           <Button
    //             type="submit"
    //             color="primary"
    //             variant="contained"
    //             className={classes.btn}
    //             fullWidth
    //             data-testid="test-sign-in-button"
    //           >
    //             Sign in
    //           </Button>
    //         )}
    //       </Stack>
    //     </FormControl>
    //   </form>
    // </Box>
  );
};

export default SignInForm;
