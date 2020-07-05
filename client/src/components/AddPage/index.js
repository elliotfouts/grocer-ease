import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Names from './Names';
import Category from './Category';
import Card from './Card';
import { ButtonPrimary } from '../Modified/Button';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import {Styles} from '../styles';
import {getGroceryById, updateGrocery, createGrocery} from '../../utils/API'

const AddPage = () => {
  const [grocery, setGrocery] = useState({});
  const importedClasses = Styles();
  const {id} = useParams()

const handleInputChange = async (event) => {
  let newValue = event.target.value;
  let newValueKey = event.target.name || 'category';
  setGrocery({...grocery, [newValueKey]:newValue});
}

const handleSubmit = async () => {
  if (id === 'new') {
    const newGrocery = {...grocery, isCurrent: true};
    createGrocery(newGrocery);
  } else if (id && grocery.isCurrent) {
    updateGrocery(id, grocery);
  } else {
    updateGrocery(id, {...grocery, isCurrent: true});
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
      <Names brand={grocery.brand} onChange={handleInputChange} name={grocery.name}/>
      <Category onChange={handleInputChange} category={grocery.category}/>
      <Card onChange={handleInputChange} imageUrl={grocery.imageUrl} quantity={grocery.quantity} note={grocery.note}/>
      <a className={importedClasses.link} onClick={handleSubmit} href='/groceries'>
        <ButtonPrimary styles={{marginTop: '2rem', }} endIcon={<CartIcon/>}>Save to List</ButtonPrimary>
      </a>
    </div>
  );
}

export default AddPage;