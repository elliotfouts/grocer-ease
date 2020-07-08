// utilities 
import React, {useEffect, useState, useCallback} from 'react';
import { useParams } from 'react-router-dom'
import {getGroceryById, updateGrocery, createGrocery, getSuggestedGroceries, getDuplicate, getSuggestedImages} from '../../utils/API'
import {makeStyles} from '@material-ui/styles';
import {Styles} from '../styles';
import _ from 'lodash';
import queryString from 'query-string';
// components
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import { ButtonPrimary } from '../Modified/Button';
import Card from './Card';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import Category from './Category';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogSuggested from './DialogMessage';
import FoodCard from '../SearchPage/FoodCard';
import Names from './Names';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles({
  backdrop: {
      zIndex: '100',
      color: '#fff',
      '& h1': {
        fontWeight: '400',
        textAlign: 'center',
        margin: '1rem',
      }
  },
  dialogueButton: {
    color: '#ffcb74',
  }
});

const AddPage = () => {
  const [grocery, setGrocery] = useState({});
  const [message, setToast] = useState({open: false, severity: 'error', content: ''});
  const [dialog, setDialog] = useState({open: false});
  const [suggested, setSuggested] = useState({suggestedGroceries: [], hasSeenGroceries: false, suggestedImages: []});
  const [imageLoading, setImageLoading] = useState(false)

  const classes = useStyles();
  const { id } = useParams();

  const setImageUrl = async (url) => {
    let groceryWithImage;
    if (url) {
      groceryWithImage = {...grocery, imageUrl: url}
    } else {
      groceryWithImage = {...grocery, imageUrl: ''}
    }
    setGrocery(groceryWithImage);
    handleImagesDialogClose(groceryWithImage);
    }

  const handleInputChange = async (event) => {
    let newValue = event.target.value;
    let newValueKey = event.target.name || 'category';
    setGrocery({...grocery, [newValueKey]:newValue});
    setSuggested({...suggested, hasSeenGroceries: false});
    }
  const handleSubmit = async () => {
    const isValidFields = validateFields();

    if (isValidFields) {
      const suggestedGroceries = await getSuggestedGroceries(grocery.name);
      const duplicate = await getDuplicate(grocery.name);

      if (suggestedGroceries.length > 0 && suggested.hasSeenGroceries === false && id == 'new') {
        setDialog({open: true});
        setSuggested({...suggested, suggestedGroceries});
      }
      else if (duplicate !== false && id != duplicate._id) {
        setToast({open: true, severity: 'error', content: 'grocery already exists'});
      }
      else if (id === 'new') {
        createGrocery(grocery);
        window.open('/groceries', '_self');
      }
      else {
        updateGrocery(id, {...grocery, isCurrent: true});
        window.open('/groceries', '_self');
      }
    }
   }
  const handleMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast({...message, open: false});
    };
  const handleGroceriesDialogClose = () => {
    setSuggested({...suggested, hasSeenGroceries: true});
    setDialog({...dialog, open: false});
    };
  const handleImagesDialogClose = (groceryWithImage) => {
    setDialog({...dialog, open: false});
    setSuggested({...suggested, suggestedImages: []});
    };
  const validateFields = () => {
    const {name, category, quantity} = grocery;
    let field = '';

    if (!name) 
      field = 'name';
    else if (!category)
      field = 'category';
    else if (!quantity) 
      field = 'quantity';

    if (field != '') {
      setToast({open: true, severity: 'error', content: `please fill out ${field}`});
      return false;
    } else  
      return true;
    }
  const suggestImages = async () => {
    await setImageLoading(true);
    let suggestedImages = await getSuggestedImages(grocery.brand, grocery.name, grocery.category);
    await setImageLoading(false);
    setDialog({open: true});
    setSuggested({...suggested, suggestedImages});
    }

  useEffect(()=>{
    (async ()=> {
      const {source, iscurrent} = queryString.parse(window.location.search);

      if (source == 'searchpage' && iscurrent == 'true') 
        setToast({open: true, severity: 'warning', content: 'this item is already on the list'});
      if (id != 'new')
        setGrocery(await getGroceryById(id));
    })();
  },[]);

  return (
    <div>
      <Snackbar open={message.open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleMessageClose}>
        <Alert onClose={handleMessageClose} severity={message.severity}>
          {message.content}
        </Alert>
      </Snackbar>

      {(suggested.suggestedGroceries.length > 0
         && <Dialog open={dialog.open} onClose={handleGroceriesDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogSuggested suggestedGroceries={suggested.suggestedGroceries} classes={classes} onClose={handleGroceriesDialogClose}/>
          </Dialog>
      )}
      {console.log(suggested.suggestedImages.length > 0, suggested.suggestedImages)}
      {(suggested.suggestedImages.length > 0
         && <Dialog open={dialog.open} onClose={()=>handleImagesDialogClose(grocery)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogSuggested suggestedImages={suggested.suggestedImages} classes={classes} setImageUrl={setImageUrl} onClose={()=>handleImagesDialogClose(grocery)}/>
          </Dialog>
      )}

      <Names brand={grocery.brand} onChange={handleInputChange} name={grocery.name}/>
      <Category onChange={handleInputChange} category={grocery.category}/>
      <Card onChange={handleInputChange} loading={imageLoading} suggestImages={suggestImages} imageUrl={grocery.imageUrl} quantity={grocery.quantity} note={grocery.note}/>
      <ButtonPrimary onClick={handleSubmit} styles={{marginTop: '2rem', }} endIcon={<CartIcon/>}>Save to List</ButtonPrimary>
    </div>
  );
}

export default AddPage;