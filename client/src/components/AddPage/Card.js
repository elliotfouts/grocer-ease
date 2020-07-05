import React from 'react';
import Card from '@material-ui/core/Card';
import {makeStyles} from '@material-ui/styles';
import {InputMultiline} from '../Modified/Input';

const useStyles = makeStyles({
  root: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& img' : {
      marginBottom: '1rem',
      maxHeight: '225px',
      maxWidth: '300px',
    }
  }
});

const FoodCard = (props) => {
  const classes = useStyles();
  const {imageUrl, quantity, note, onChange} = props;

  return (
    <Card className={classes.root}>
      <img src={imageUrl}></img>
      <InputMultiline placeholder={'quantity'} onChange={onChange} name={'quantity'} value={quantity} multiline={true} rows={1}/>
      <InputMultiline placeholder={'note'} onChange={onChange} name={'note'} value={note} multiline={true} rows={1} />
    </Card>
  );
}

export default FoodCard;