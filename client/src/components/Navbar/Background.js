import React from 'react';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    background: '#FFCB74', 
  }
})

const Background = (props) => {
  const classes = useStyles();

  return <div className={classes.root}>{props.children}</div>;
}

export default Background;