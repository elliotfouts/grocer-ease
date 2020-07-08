import React, {useEffect, useState, useCallback} from 'react';
import { useParams } from 'react-router-dom';

import Alert from '@material-ui/lab/Alert';
import { ButtonPrimary } from '../Modified/Button';
import Card from './Card';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import Category from './Category';
import Dialog from '@material-ui/core/Dialog';
import DialogMessage from './DialogMessage';
import FoodCard from '../SearchPage/FoodCard';
import Names from './Names';
import Snackbar from '@material-ui/core/Snackbar';

import {getGroceryById, updateGrocery, createGrocery, doesExistGrocery} from '../../utils/API'
import {makeStyles} from '@material-ui/styles';
import {Styles} from '../styles';
import _ from 'lodash';

const useStyles = makeStyles({
  dialogueButton: {
    color: '#ffcb74',
  }
});

const AddPage = () => {
  const [grocery, setGrocery] = useState({});
  const [message, setToast] = useState({open: false, severity: 'error', content: ''});
  const [dialogue, setDialogue] = useState({open: true});
  const [duplicates, setDuplicates] = useState({count:0, duplicatesArr:[]});
  const [unique, setUnique] = useState(false);

  const classes = useStyles();
  const {id, isDuplicate} = useParams();

  const handleInputChange = async (event) => {
    let newValue = event.target.value;
    let newValueKey = event.target.name || 'category';
    setGrocery({...grocery, [newValueKey]:newValue});
  }
  const handleSubmit2 = async () => {
    const isValidFields = validateFields();
  }
  const handleSubmit = async () => {
    const isValidFields = validateFields();
    // front end validation to ensure require fields are filled
    if (isValidFields.result) {
      // if item is unique and suggestions have been given
      if (id ==='new' && unique) {
        const getDuplicates = await doesExistGrocery(grocery.name);
        let isUnique = true;

        getDuplicates.forEach(duplicate => {
          // if suggestions have been given and name is still the same
          if (duplicate.name.toLowerCase() == grocery.name.toLowerCase()) {
            setToast({open: true, severity: 'error', content: `item names must be unique`});
            isUnique = false;
            return;
          } 
        });
        console.log(isUnique)
        if (isUnique) 
          createGrocery({...grocery, isCurrent: true});
        else 
        return;
      } 
      // if item is not in the datbase yet
      else if (id === 'new')  {
        const getDuplicates = await doesExistGrocery(grocery.name);
        setDuplicates({...duplicates, duplicateArr: getDuplicates});
        // if the item is unique
        if (getDuplicates.length == 0) 
          createGrocery({...grocery, isCurrent: true});
        // if the item has suggestions
        else {
          setUnique(true);
          return;
        }
      }
      // grocery already exists and is on the list
      else if (id && grocery.isCurrent) {
        grocery.frequency = grocery.frequency + 1;
        updateGrocery(id, grocery);
      }
      // grocery already exists but is not on the list
      else {
        grocery.frequency = grocery.frequency + 1;
        updateGrocery(id, {...grocery, isCurrent: true});
      }
      window.open('/groceries', '_self');
    } else {
      setToast({open: true, severity: 'error', content: `please fill out ${isValidFields.field}`});
    }
  }
  const handleMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast({...message, open: false});
  };
  const handleDialogClose = () => {
    const {count: duplicateCount} = duplicates;
    setDuplicates({...duplicates, count: duplicateCount + 1});
    setDialogue({...dialogue, open: false});
  };
  const validateFields = () => {
    const {name, category, quantity} = grocery;
    if (!name) {
      return {result: false, field: 'name'};
    } else if (!category) {
      return {result: false, field: 'category'};
    } else if (!quantity) {
      return {result: false, field: 'quantity'};
    } else {
      return {result: true};
    }
  }

  useEffect(()=>{
    if (id !== 'new') {
        (async () => {
          setGrocery(await getGroceryById(id));
        })();
    }
    if (isDuplicate === 'true') {
      setToast({open: true, severity: 'warning', content: 'this is already on the list'});
    }
  },[]);

  return (
    <div>
      <Snackbar open={message.open} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleMessageClose}>
        <Alert onClose={handleMessageClose} severity={message.severity}>
          {message.content}
        </Alert>
      </Snackbar>

      {duplicates.duplicatesArr.map(duplicate=>{
        console.log(duplicate);
        return (
          <Dialog open={dialogue.open} onClose={handleDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogMessage duplicates={duplicates} classes={classes} onClose={handleDialogClose}/>
          </Dialog>
        )
      })}

      {/* {(duplicates.count < duplicates.duplicatesArr.length)
      ? <Dialog open={dialogue.open} onClose={handleDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogMessage duplicates={duplicates} classes={classes} onClose={handleDialogClose}/>
      </Dialog>
      : ''
      } */}
      
      <Names brand={grocery.brand} onChange={handleInputChange} name={grocery.name}/>
      <Category onChange={handleInputChange} category={grocery.category}/>
      <Card onChange={handleInputChange} imageUrl={grocery.imageUrl} quantity={grocery.quantity} note={grocery.note}/>
      <ButtonPrimary onClick={handleSubmit} styles={{marginTop: '2rem', }} endIcon={<CartIcon/>}>Save to List</ButtonPrimary>
    </div>
  );
}

export default AddPage;