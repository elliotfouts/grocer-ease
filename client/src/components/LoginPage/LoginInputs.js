import React from 'react';
import {InputOutlined} from '../Modified/Input';
import {makeStyles} from '@material-ui/styles';
import {Person, Email, Lock} from '@material-ui/icons';

const useStyles = makeStyles({
  container : {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: '1rem',
  }
});

const Inputs = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <InputOutlined placeholder={'username'} icon={<Person/>}/>
      <InputOutlined placeholder={'email'} icon={<Email/>}/>
      <InputOutlined placeholder={'password'} type={'password'} icon={<Lock/>}/>
    </div>
  )
}

export default Inputs;