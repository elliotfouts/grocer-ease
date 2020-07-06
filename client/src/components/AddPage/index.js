import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Names from './Names';
import Category from './Category';
import Card from './Card';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { ButtonPrimary } from '../Modified/Button';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import {Styles} from '../styles';
import {getGroceryById, updateGrocery, createGrocery} from '../../utils/API'

const AddPage = () => {
  const [grocery, setGrocery] = useState({});
  const [message, setMessage] = useState({open: false, severity: 'error', content: ''});
  const importedClasses = Styles();
  const {id} = useParams()

  const handleInputChange = async (event) => {
    let newValue = event.target.value;
    let newValueKey = event.target.name || 'category';
    setGrocery({...grocery, [newValueKey]:newValue});
  }
  const handleSubmit = async () => {
    const isValidFields = validateFields();
    if (isValidFields.result) {
      if (id === 'new') 
        createGrocery({...grocery, isCurrent: true});
      else if (id && grocery.isCurrent)
        updateGrocery(id, grocery);
      else
        updateGrocery(id, {...grocery, isCurrent: true});
    } else {
      const content = `please fill out ${isValidFields.field}`;
      setMessage({...message, open: true, content});
      console.log(message);
    }
  }
  const handleMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage({...message, open: false});
  };
  const validateFields = () => {
    const {name, imageUrl, quantity, note} = grocery;
    if (!name) {
      return {result: false, field: 'name'};
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
  },[]);

  return (
    <div>
      <Snackbar open={message.open} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleMessageClose}>
        <Alert onClose={handleMessageClose} severity={message.severity}>
          {message.content}
        </Alert>
      </Snackbar>
      
      <Names brand={grocery.brand} onChange={handleInputChange} name={grocery.name}/>
      <Category onChange={handleInputChange} category={grocery.category}/>
      <Card onChange={handleInputChange} imageUrl={grocery.imageUrl} quantity={grocery.quantity} note={grocery.note}/>
      <ButtonPrimary onClick={handleSubmit} styles={{marginTop: '2rem', }} endIcon={<CartIcon/>}>Save to List</ButtonPrimary>
    </div>
  );
}

export default AddPage;