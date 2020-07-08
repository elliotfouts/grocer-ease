import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import {makeStyles} from '@material-ui/styles';
import {Styles} from '../styles';

const useStyles = makeStyles({
  root: {
      marginBottom: '0.25rem',
      padding: '0.5rem',
      width: '100%',
  },
  foodInfo: {
    maxWidth: '70%',
    padding: '0.25rem',
    '& h1': {
      fontSize: '1.2rem',
      margin: '0',
      marginBottom: '0.5rem',
      fontWeight: '400',
    },
    '& p': {
      color: '#07031A50',
      margin: '0',
    }
  },
  userChip: {
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
  },
  image: {
    maxHeight: '75px',
    maxWidth: '75px',
  },
});

const FoodCard = (props) => {
  const {brand, name, quantity, users, imageUrl, note, _id} = props.foodInfo;
  const classes = useStyles();
  const importedClasses = Styles();

  return (
    <a className={`${importedClasses.link} ${classes.root}`} href={`/groceries/${_id}?iscurrent=true&source=listpage`}>
      <Card>
        <Grid container alignItems='center' justify='space-between'>
          <div className={classes.foodInfo}>
            <h1>{brand} {name} ({quantity})</h1>
            {users.map((user, index) => <Chip label={user} className={classes.userChip} key={index} variant="outlined"/>)}
            <p>{note}</p>
          </div>
          <img className={classes.image} src={imageUrl}/>
        </Grid>
      </Card>
    </a>
  )
}

export default FoodCard;