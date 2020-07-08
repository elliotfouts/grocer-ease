import React from 'react';
import Card from '@material-ui/core/Card';
import {makeStyles} from '@material-ui/styles';
import {InputMultiline} from '../Modified/Input';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#07031A',
    '& img' : {
      marginBottom: '1rem',
      maxHeight: '225px',
      maxWidth: '300px',
    }
  },
  button: {
    color: '#07031A',
    border: '1px solid currentColor',
    marginBottom: '2rem',
  }
});

const FoodCard = (props) => {
  const classes = useStyles();
  const {imageUrl, quantity, note, onChange, loading, suggestImages} = props;

  return (
    <Card className={classes.root}>
      {(loading) 
      ? <div className={classes.root}>
         <CircularProgress color='inherit'/>
          <p>Searching images...</p>
        </div> 
      : (imageUrl)
        ? <img src={imageUrl} onClick={suggestImages}></img> 
        : <Button onClick={suggestImages} variant="outlined" color="secondary" className={classes.button} startIcon={<ImageIcon/>}>
            Add Image
          </Button>
      }
      <InputMultiline placeholder={'quantity'} onChange={onChange} name={'quantity'} value={quantity} multiline={true} rows={1}/>
      <InputMultiline placeholder={'note'} onChange={onChange} name={'note'} value={note} multiline={true} rows={1} />
    </Card>
  );
}

export default FoodCard;