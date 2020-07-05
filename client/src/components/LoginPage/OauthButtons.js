import React from 'react';
import Button from '@material-ui/core/Button';
import AppleIcon from '@material-ui/icons/Apple';
import FacebookIcon from '@material-ui/icons/Facebook';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    justifyContent: 'flex-start',
    color: '#FFFFFF',
    marginBottom: '1rem',
  },
  apple: {
    backgroundColor: '#333333',
    '&:hover, &:focus' : {
      backgroundColor: '#333333AA',
    }
  },
  facebook: {
    backgroundColor: '#4168b2',
    '&:hover, &:focus' : {
      backgroundColor: '#4168b2CC',
    }
  }
}, {name: 'MuiButton'})

const OauthButtons = () => {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" className={`${classes.root} ${classes.apple}`} startIcon={<AppleIcon />}>Login with Apple</Button>
      <Button variant="contained" className={`${classes.root} ${classes.facebook}`} startIcon={<FacebookIcon />}>Login with Facebook</Button>
    </div>
  )
}

export default OauthButtons;