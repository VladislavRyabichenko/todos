import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignInForm from './SignInForm';
import RegistrationForm from './RegistrationForm';
import { selectLoginSection, setCurrentSection, setLoginError } from '../../store/slices/loginSlice';
import { SIGN_IN, SIGN_UP } from '../../constants/values';

export default function Login() {
  const dispatch = useDispatch();
  const currentSection = useSelector(selectLoginSection);
  const handleNavigation = () => {
    currentSection === SIGN_IN
      ? dispatch(setCurrentSection({ section: SIGN_UP }))
      : dispatch(setCurrentSection({ section: SIGN_IN }));
  };

  useEffect(() => {
    dispatch(setLoginError({ active: false, message: '' }));
  }, [currentSection]);

  return (
    <div className="login--container">
      <div className="login--navigation">
        <button type="button" className="login--nav-button" onClick={handleNavigation}>
          {currentSection === SIGN_IN ? 'Go to registration' : 'Back to sign in'}
        </button>
      </div>
      {currentSection === SIGN_IN && <SignInForm />}
      {currentSection === SIGN_UP && <RegistrationForm />}
    </div>
  );
}
