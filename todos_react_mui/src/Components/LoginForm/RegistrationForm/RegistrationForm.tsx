import React, { FunctionComponent } from 'react';
// import { CircularProgress } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useManageRegistration } from './useManageRegistration';
import { useStyles } from './styles/registrationExtraStyles';
import { STATUS_LOADING } from '../../../constants/values';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Flex from '../../UI/Flex';
import InputForm from '../../UI/Input';
import Container from '../../UI/Container';
import Button from '../../UI/Button';

const RegistrationForm: FunctionComponent<any> = () => {
  const { loginValue, handleLoginInput, passwordValue, handlePasswordInput, handleSubmit, status, error } =
    useManageRegistration({
      initialLogin: '',
      initialPassword: '',
      useDispatch: useAppDispatch,
      useSelector: useAppSelector,
    });

  return (
    <Flex direction="column" width="100%" data-testid="test-registration-wrapper">
      <form onSubmit={handleSubmit} data-testid="test-registration-form" style={{ height: '100%' }}>
        <Flex direction="column" justify="space-between" height="100%">
          <Flex direction="column">
            <InputForm
              width="100%"
              height="50px"
              placeholder="Login"
              value={loginValue}
              onChange={handleLoginInput}
              isRequired={true}
              data-testid="test-registration-field-login"
            />
          </Flex>
          <Flex direction="column">
            <InputForm
              type="password"
              width="100%"
              height="50px"
              placeholder="Password"
              value={passwordValue}
              onChange={handlePasswordInput}
              isRequired={true}
              data-testid="test-registration-field-password"
            />
          </Flex>
          {error.active && (
            <Container data-testid="test-helper-text-registration">
              <span>{error.message || 'Something went wrong...'}</span>
            </Container>
          )}
          <Flex justify="center">
            {status === STATUS_LOADING ? (
              <CircularProgress color="success" data-testid="test-loader-component" />
            ) : (
              <Button text="SIGN UP" height="40px" width="50%" data-testid="test-registration-button" />
            )}
          </Flex>
        </Flex>
      </form>
    </Flex>
    // <Box data-testid="test-registration-wrapper">
    //   <form onSubmit={handleSubmit} data-testid="test-registration-form">
    //     <FormControl fullWidth={true} error={error.active} aria-describedby="my-helper-text">
    //       <Stack spacing={1}>
    //         <TextField
    //           data-testid="test-registration-field-login"
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
    //           required
    //           fullWidth
    //           value={loginValue}
    //           onChange={handleLoginInput}
    //         />
    //
    //         <TextField
    //           data-testid="test-registration-field-password"
    //           id="password-field"
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
    //           required
    //           value={passwordValue}
    //           onChange={handlePasswordInput}
    //         />
    //
    //         {error.active && (
    //           <FormHelperText
    //             id="my-helper-text"
    //             data-testid="test-helper-text-registration"
    //             className={classes.helpText}
    //           >
    //             {error.message || 'Something went wrong...'}
    //           </FormHelperText>
    //         )}
    //
    //         {status === STATUS_LOADING ? (
    //           // <Box >
    //           <CircularProgress color="success" data-testid="test-loader-component" />
    //         ) : (
    //           // </Box>
    //           <Button
    //             type="submit"
    //             color="primary"
    //             variant="contained"
    //             className={classes.btn}
    //             fullWidth
    //             data-testid="test-registration-button"
    //           >
    //             Register
    //           </Button>
    //         )}
    //       </Stack>
    //     </FormControl>
    //   </form>
    // </Box>
  );
};

export default RegistrationForm;
