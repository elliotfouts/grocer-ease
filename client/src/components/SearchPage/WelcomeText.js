import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Styles} from '../styles';

const WelcomeText = (props) => {
  const {name} = props;
  const classes = Styles();

  return (
    <div>
      <h1 className={classes.title}>Hey {name},</h1>
      <h2 className={classes.subTitle}>Find foods that you want</h2>
    </div>
  );
}

export default WelcomeText;