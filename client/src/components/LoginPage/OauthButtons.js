import React from 'react';
import Button from '@material-ui/core/Button';
import AppleIcon from '@material-ui/icons/Apple';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    justifyContent: 'flex-start',
    color: '#FFFFFF',
    marginBottom: '1rem',
  },
  apple: {
    color: '#FFFFFF',
    backgroundColor: '#000000',
    '&:hover, &:focus' : {
      backgroundColor: '#000000BB',
    }
  },
  facebook: {
    backgroundColor: '#d74a37',
    '&:hover, &:focus' : {
      backgroundColor: '#d74a37CC',
    }
  }
}, {name: 'MuiButton'})

const OauthButtons = () => {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" className={`${classes.root} ${classes.apple}`} startIcon={<i className="fab fa-apple"></i>}>Login with Apple</Button>
      <Button variant="contained" className={`${classes.root} ${classes.facebook}`} startIcon={<i style={{fontSize: '1rem'}} className="fab fa-google"></i>}>Login with Google</Button>
    </div>
  )
}

export default OauthButtons;