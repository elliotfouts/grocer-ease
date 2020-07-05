import React from 'react';
import {Input, InputAdornment} from '@material-ui/core/';
import {makeStyles} from '@material-ui/styles';

const inputStyles = makeStyles({
  input: {
    border: '1px solid #000000',
    padding: '0 10px',
    borderRadius: '5px',
    marginBottom: '1rem',
    '& input': {
      marginLeft: '10px',
    }
  }
})
const inputPlainStyles = makeStyles({
  inputPlain: {
    '& input': {
      fontSize: '1.5rem',
      fontWeight: '400',
    }
  }
})
const InputMultilineStyles = makeStyles({
    inputMultiline: {
      // border: '1px solid #000000',
      padding: '0 10px',
      borderRadius: '5px',
      marginBottom: '1rem',
      padding: '0.5rem',
      // '& input': {
      //     padding: '5px',
      // }
    }
});

export const InputOutlined = (props) => {
  const {placeholder, icon, type, value, onChange} = props;
  const classes = inputStyles();

  return (
    <Input 
      className={classes.input} 
      placeholder={placeholder} 
      disableUnderline={true} 
      fullWidth={true}
      type={type}
      value={value}
      onChange={onChange}
      startAdornment={<InputAdornment>{icon}</InputAdornment>}
    />
  );
}

export const InputPlain = (props) => {
  const classes = inputPlainStyles();
  const {placeholder, value, onChange, name} = props;

  return (
    <Input 
      className={classes.inputPlain} 
      placeholder={placeholder} 
      name={name}
      disableUnderline={true}
      value={value}
      onChange={onChange}
    />
  );
}

export const InputMultiline = (props) => {
    const {placeholder, icon, type, value, name, onChange, multiline, rows} = props;
    const classes = InputMultilineStyles();
  
    return (
      <Input 
        className={classes.inputMultiline} 
        name={name}
        onChange={onChange}
        placeholder={placeholder} 
        disableUnderline={true} 
        fullWidth={true}
        type={type}
        multiline={multiline}
        value={value}
        rows={rows}
        startAdornment={<InputAdornment>{icon}</InputAdornment>}
      />
    );
}