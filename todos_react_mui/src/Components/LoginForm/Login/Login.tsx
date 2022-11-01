import React from 'react';
import { Tab, Tabs, Box, Avatar, Stack, Divider } from '@mui/material';
import useStyles from './styles/loginExtraStyles';
import { TabPanel, TabContext } from '@material-ui/lab';
import { LockOutlined } from '@material-ui/icons';

import SignInForm from '../SignInForm';
import RegistrationForm from '../RegistrationForm';

import { useManageLogin } from './useManageLogin';
import { SIGN_IN, SIGN_UP } from '../../../constants/values';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

const Login = () => {
  const { currentSection, handleNavigation } = useManageLogin({
    useDispatch: useAppDispatch,
    useSelector: useAppSelector,
  });

  const classes = useStyles();

  return (
    <Stack
      data-testid="test-login-wrapper"
      direction="column"
      justifyContent="space-around"
      className={classes.container}
      spacing={2}
      divider={<Divider flexItem />}
    >
      <Stack
        direction="column"
        justifyContent="space-around"
        className={classes.container}
        spacing={2}
        divider={<Divider flexItem />}
      >
        <Avatar className={classes.avatar} sx={{ width: 55, height: 55 }} variant="rounded">
          <LockOutlined />
        </Avatar>
      </Stack>

      <Stack data-testid="test-tabs-wrapper">
        <TabContext value={currentSection} data-testid="test-tabs-context">
          <Box>
            <Tabs
              data-testid="test-tabs-container"
              value={currentSection}
              onChange={handleNavigation}
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              centered
              className={classes.tab}
            >
              <Tab value={SIGN_IN} label="Sign In" data-testid="tab-to-sign-in" />
              <Tab value={SIGN_UP} label="Sign Up" data-testid="tab-to-sign-up" />
            </Tabs>
          </Box>
          <Box>
            <TabPanel value={SIGN_IN} tabIndex={0} data-testid="test-tabs-sign-in-panel">
              <Box data-testid="test-sign-in-component-in-panel">
                <SignInForm />
              </Box>
            </TabPanel>
            <TabPanel value={SIGN_UP} tabIndex={1} data-testid="test-tabs-sign-up-panel">
              <Box data-testid="test-sign-up-component-in-panel">
                <RegistrationForm />
              </Box>
            </TabPanel>
          </Box>
        </TabContext>
      </Stack>
    </Stack>
  );
};
export default Login;
