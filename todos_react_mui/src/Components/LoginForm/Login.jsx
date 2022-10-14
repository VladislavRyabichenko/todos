import React from 'react'; //  { useEffect }
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, Box, Grid, Avatar } from '@mui/material';
import { TabPanel, TabContext } from '@material-ui/lab';
import { LockOutlined } from '@material-ui/icons';
// import SignInForm from './SignInForm';
// import RegistrationForm  from './RegistrationForm';
import { selectLoginSection, setCurrentSection } from '../../store/slices/loginSlice';
import SignInForm from './SignInForm';
import RegistrationForm from './RegistrationForm';

export default function Login() {
  const dispatch = useDispatch();
  const currentSection = useSelector(selectLoginSection);
  const handleNavigation = () => {
    currentSection === 'sign' // to const
      ? dispatch(setCurrentSection({ section: 'register' }))
      : dispatch(setCurrentSection({ section: 'sign' }));
  };

  // useEffect(() => {
  //   dispatch(setLoginError({ active: false, message: '' }));
  // }, [currentSection]);
  const avatarStyle = { backgroundColor: '#5b0b8d' };

  return (
    <Grid align="center">
      <Grid align="center">
        <Avatar style={avatarStyle}>
          <LockOutlined />
        </Avatar>
        <h2>{currentSection === 'sign' ? 'Sign In' : 'Sign Up'}</h2>
      </Grid>
      <TabContext value={currentSection}>
        <Grid align="center" sx={{ width: '500px' }}>
          <Tabs
            value={currentSection}
            onChange={() => handleNavigation()}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            variant="fullWidth"
          >
            <Tab value="sign" label="Sign In" />
            <Tab value="register" label="Sign Up" />
          </Tabs>
        </Grid>
        <Box>
          <TabPanel value="sign" tabIndex={0}>
            <SignInForm handleChange={() => console.log('CHANGE TO REG')} />
          </TabPanel>
          <TabPanel value="register" tabIndex={1}>
            <RegistrationForm />
          </TabPanel>
        </Box>
      </TabContext>
    </Grid>

    // <div className="login--container">
    //   <div className="login--navigation">
    //     <button type="button" className="login--nav-button" onClick={handleNavigation}>
    //       {currentSection === 'sign' ? 'Go to registration' : 'Back to sign in'}
    //     </button>
    //   </div>
    //   {currentSection === 'sign' && <SignInForm />}
    //   {currentSection === 'register' && <RegistrationForm />}
    // </div>
  );
}
