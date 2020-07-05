import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Background from './Background';
import Navbar from './Navbar';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#EEEE',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
    boxShadow: '0 0 1rem rgba(0, 0, 0, 0.25)',
    padding: '2rem',
    minHeight: '90vh',
  }
});

const MainContainer = (props) => {
  const classes = useStyles();

  return (
    <CssBaseline>
      <Background>
        <Navbar/>
        <main className={classes.root}>{props.children}</main>
      </Background>
    </CssBaseline>
  )
}

export default MainContainer;