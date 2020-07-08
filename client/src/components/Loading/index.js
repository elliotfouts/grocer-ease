import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    color: '#000000',
  }
})

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <CircularProgress color='inherit'/>
    </div>
  )
}

export default Loading;