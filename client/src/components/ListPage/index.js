import React, {useEffect, useState} from 'react';
import Title from './TitleFilter';
import FoodCard from './FoodCard';
import {Styles} from '../styles';
import {getCurrentGroceries, removeGrocery} from '../../utils/API';
import {SwipeToDelete} from '../Modified/Swipeout';
import { SwipeableList } from '@sandstreamdev/react-swipeable-list';


const ListPage = () => {
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    (async() => {
      const groceries = await getCurrentGroceries();
      setGroceryList(groceries);
    })();
  }, []);
  
  const importedClasses = Styles();

  const handleDelete = async (id) => {
    console.log(`delete: ${id}`);
    removeGrocery(id);
    setGroceryList(await getCurrentGroceries());
  }

  return (
    <div>
      <Title/>
      <SwipeableList>
      {
        (groceryList.length > 0)
        ? groceryList.map((grocery) => {
          return (
            <SwipeToDelete onSwipeRight={()=>handleDelete(grocery._id)}>
                <FoodCard key={grocery._id} foodInfo={grocery}/>
            </SwipeToDelete>
          )})
          : <h1 style={{textAlign: 'center', marginTop: '1rem'}} className={importedClasses.subTitle}>The list is empty<br/> Thank you Mom!</h1>
      }
      </SwipeableList>
    </div>
  );
}

export default ListPage;