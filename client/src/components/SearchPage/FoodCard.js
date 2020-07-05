import React from 'react';
import Card from '@material-ui/core/Card';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& h2': {
      backgroundColor: '#4F8A8B30',
      margin: 0,
      padding: '0.5rem',
      width: '100%',
      fontWeight: '400',
      fontSize: '1rem',
    },
    '& img': {
      maxHeight: '100px',
      maxWidth: '100px',
      margin: '1rem 0rem',
    }
  }
})

const FoodCard = (props) => {
  const {brand, name, imageUrl} = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {(brand)
      ? <h2>{brand} {name}</h2>
      : <h2>{name}</h2>
      }
      <img src={imageUrl}/>
    </Card>
  )
}

export default FoodCard;