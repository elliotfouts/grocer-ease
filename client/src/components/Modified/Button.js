import React from 'react';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Styles} from '../styles';

export const ButtonPrimary = (props) => {
  let { styles, children, endIcon} = props;
  styles={
    ...styles,
    backgroundColor: '#FFCB74', 
    width: 'fit-content', 
    color: '#000000'
  }
  return (<Button style={styles} endIcon={endIcon} variant="contained">{children}</Button>)
}

export const ButtonFloatingAction = (props) => {
  let { styles, children} = props;
  const importedClasses = Styles();
  styles={
    ...styles,
    backgroundColor: '#FFCB74', 
    color: '#000000',
    position: 'fixed',
    right: '1rem',
    bottom: '1rem',
    height: '75px',
    width: '75px',
    borderRadius: '50%'
  }
  return (<a href='/groceries/new' className={importedClasses.link}><Fab style={styles} variant="contained"><AddIcon fontSize='large'/></Fab></a>)
}