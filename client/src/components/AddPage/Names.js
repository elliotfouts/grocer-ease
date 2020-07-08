import React from 'react';
import {InputPlain, InputOutlined} from '../Modified/Input'; 
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    marginBottom: '1rem',
  }
});

const Names = (props) => {
  const {brand, name, onChange} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <InputPlain onChange={onChange} placeholder={'Brand (optional)'} name={'brand'} value={brand}/>

      <InputPlain onChange={onChange} placeholder={'Food name'} name={'name'} value={name}/>
  </div>
  )
}

export default Names;