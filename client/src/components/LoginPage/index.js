import React from 'react';
import Title from './Title';
import OauthButtons from './OauthButtons';
import LoginInputs from './LoginInputs';
import {ButtonPrimary} from '../Modified/Button'
import {makeStyles} from '@material-ui/styles';
import {Styles} from '../styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
});

const LoginPage = () => {
  const classes = useStyles();
  const importedClasses = Styles();
  return (
    <div className={classes.container}>
      <Title/>
      <OauthButtons/>
      <p>OR</p>
      <LoginInputs/>
      <a className={importedClasses.link} href='/groceries'>
        <ButtonPrimary styles={{marginTop: '1rem', }}>
          Sign In
        </ButtonPrimary>
      </a>
    </div>
  )
};

export default LoginPage;
