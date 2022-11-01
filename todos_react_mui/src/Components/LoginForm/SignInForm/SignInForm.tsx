import React, { FunctionComponent } from 'react';
import { TextField, Stack, FormControl, FormHelperText, Box, Button, CircularProgress } from '@mui/material';
import useStyles from './styles/SignInExtraStyles';
import { useManageSignIn } from './manageSignInHook/useManageSignIn';
import { STATUS_LOADING } from '../../../constants/values';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

const SignInForm = () => {
  const { loginValue, handleLoginInput, passwordValue, handlePasswordInput, handleSubmit, status, error } =
    useManageSignIn({
      initialLogin: '',
      initialPassword: '',
      useDispatch,
      useSelector,
    });
  const classes = useStyles();

  return (
    <Box data-testid="test-sign-in-wrapper">
      <form onSubmit={handleSubmit} data-testid="test-sign-in-form">
        <FormControl fullWidth={true} error={error.active} aria-describedby="my-helper-text">
          <Stack spacing={1}>
            <TextField
              data-testid="test-sign-in-field-login"
              id="login-field"
              label="Username"
              variant="outlined"
              placeholder="Enter username"
              inputProps={{
                style: {
                  color: 'whitesmoke',
                },
              }}
              className={classes.textField}
              // required
              fullWidth
              value={loginValue}
              onChange={handleLoginInput}
            />
            <FormHelperText id="my-helper-text">{''}</FormHelperText>

            <TextField
              id="pass-field"
              data-testid="test-sign-in-field-password"
              aria-describedby="my-helper-text"
              label="Password"
              variant="outlined"
              placeholder="Enter username"
              inputProps={{
                type: 'password',
                style: {
                  color: 'whitesmoke',
                },
              }}
              className={classes.textField}
              fullWidth
              // required
              value={passwordValue}
              onChange={handlePasswordInput}
            />

            {error.active && (
              <FormHelperText id="my-helper-text" data-testid="test-helper-text-sign-in" className={classes.helpText}>
                {error.message || 'Something went wrong...'}
              </FormHelperText>
            )}

            {status === STATUS_LOADING ? (
              <CircularProgress color="success" data-testid="test-loader-component" />
            ) : (
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.btn}
                fullWidth
                data-testid="test-sign-in-button"
              >
                Sign in
              </Button>
            )}
          </Stack>
        </FormControl>
      </form>
    </Box>
  );
};

export default SignInForm;
