import React from 'react';
import { useState } from 'react';
import { Tab, Tabs, Box, Stack } from '@mui/material';
import useStyles from './styles/loginExtraStyles';
import { TabPanel, TabContext } from '@material-ui/lab';
import { LockOutlined } from '@material-ui/icons';
import Avatar from '../../UI/Avatar';

import SignInForm from '../SignInForm';
import RegistrationForm from '../RegistrationForm';

import { useManageLogin } from './useManageLogin';
import { SIGN_IN, SIGN_UP } from '../../../constants/values';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Divider } from '../../UI/Divider';
import Flex from '../../UI/Flex';
import Container from '../../UI/Container';
import InputForm from '../../UI/Input';

const Login = () => {
  const { currentSection, handleNavigation } = useManageLogin({
    useDispatch: useAppDispatch,
    useSelector: useAppSelector,
  });

  const classes = useStyles();

  return (
    <Container width="100%" height="400px" padding="10px" data-testid="test-login-wrapper">
      <Flex direction="column" width="100%" height="100%">
        <Flex justify="center">
          <Avatar>
            <LockOutlined />
          </Avatar>
        </Flex>
        <Divider height={2} />
        <Flex direction="column" height="100%">
          <TabContext value={currentSection}>
            <Flex justify="center" data-testid="test-tabs-wrapper">
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
            </Flex>
            <Flex direction="column" height="100%">
              <TabPanel value={SIGN_IN} tabIndex={0} data-testid="test-tabs-sign-in-panel" style={{ height: '100%' }}>
                <Flex height="100%" data-testid="test-sign-in-component-in-panel">
                  <SignInForm />
                </Flex>
              </TabPanel>
              <TabPanel value={SIGN_UP} tabIndex={1} data-testid="test-tabs-sign-up-panel" style={{ height: '100%' }}>
                <Flex height="100%" data-testid="test-sign-up-component-in-panel">
                  <RegistrationForm />
                </Flex>
              </TabPanel>
            </Flex>
          </TabContext>
        </Flex>
      </Flex>
    </Container>
    // <Stack
    //   data-testid="test-login-wrapper"
    //   direction="column"
    //   justifyContent="space-around"
    //   className={classes.container}
    //   spacing={2}
    //   divider={<Divider flexItem />}
    // >
    //   <Stack
    //     direction="column"
    //     justifyContent="space-around"
    //     className={classes.container}
    //     spacing={2}
    //     divider={<Divider flexItem />}
    //   >
    //     <Avatar className={classes.avatar} sx={{ width: 55, height: 55 }} variant="rounded">
    //       <LockOutlined />
    //     </Avatar>
    //   </Stack>
    //
    //   <Stack data-testid="test-tabs-wrapper">
    //     <TabContext value={currentSection} data-testid="test-tabs-context">
    //       <Box>
    //         <Tabs
    //           data-testid="test-tabs-container"
    //           value={currentSection}
    //           onChange={handleNavigation}
    //           indicatorColor="secondary"
    //           aria-label="secondary tabs example"
    //           centered
    //           className={classes.tab}
    //         >
    //           <Tab value={SIGN_IN} label="Sign In" data-testid="tab-to-sign-in" />
    //           <Tab value={SIGN_UP} label="Sign Up" data-testid="tab-to-sign-up" />
    //         </Tabs>
    //       </Box>
    //       <Box>
    //         <TabPanel value={SIGN_IN} tabIndex={0} data-testid="test-tabs-sign-in-panel">
    //           <Box data-testid="test-sign-in-component-in-panel">
    //             <SignInForm />
    //           </Box>
    //         </TabPanel>
    //         <TabPanel value={SIGN_UP} tabIndex={1} data-testid="test-tabs-sign-up-panel">
    //           <Box data-testid="test-sign-up-component-in-panel">
    //             <RegistrationForm />
    //           </Box>
    //         </TabPanel>
    //       </Box>
    //     </TabContext>
    //   </Stack>
    // </Stack>
  );
};
export default Login;
