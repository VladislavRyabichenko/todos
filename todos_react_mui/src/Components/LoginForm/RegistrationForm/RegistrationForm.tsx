import React, { FunctionComponent } from 'react';
import { Box, Button, CircularProgress, FormControl, FormHelperText, Stack, TextField } from '@mui/material';
import { useManageRegistration } from './useManageRegistration';
import { useStyles } from './styles/registrationExtraStyles';
import { STATUS_LOADING } from '../../../constants/values';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

const RegistrationForm: FunctionComponent<any> = () => {
  const { loginValue, handleLoginInput, passwordValue, handlePasswordInput, handleSubmit, status, error } =
    useManageRegistration({
      initialLogin: '',
      initialPassword: '',
      useDispatch: useAppDispatch,
      useSelector: useAppSelector,
    });

  const classes = useStyles();

  return (
    <Box data-testid="test-registration-wrapper">
      <form onSubmit={handleSubmit} data-testid="test-registration-form">
        <FormControl fullWidth={true} error={error.active} aria-describedby="my-helper-text">
          <Stack spacing={1}>
            <TextField
              data-testid="test-registration-field-login"
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
              required
              fullWidth
              value={loginValue}
              onChange={handleLoginInput}
            />

            <TextField
              data-testid="test-registration-field-password"
              id="password-field"
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
              required
              value={passwordValue}
              onChange={handlePasswordInput}
            />

            {error.active && (
              <FormHelperText
                id="my-helper-text"
                data-testid="test-helper-text-registration"
                className={classes.helpText}
              >
                {error.message || 'Something went wrong...'}
              </FormHelperText>
            )}

            {status === STATUS_LOADING ? (
              // <Box >
              <CircularProgress color="success" data-testid="test-loader-component" />
            ) : (
              // </Box>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.btn}
                fullWidth
                data-testid="test-registration-button"
              >
                Register
              </Button>
            )}
          </Stack>
        </FormControl>
      </form>
    </Box>
  );
};

export default RegistrationForm;
