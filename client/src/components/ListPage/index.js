import React, {useEffect, useState} from 'react';
import Title from './TitleFilter';
import FoodCard from './FoodCard';
import {Styles} from '../styles';
import {getCurrentGroceries, removeGrocery} from '../../utils/API';
import {SwipeToDelete} from '../Modified/Swipeout';
import { SwipeableList } from '@sandstreamdev/react-swipeable-list';
import Loading from '../Loading';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
  }
})

const ListPage = () => {
  const [groceryList, setGroceryList] = useState([]);
  const [empty, setEmpty] = useState(false);
  const importedClasses = Styles();
  const classes = useStyles();

  useEffect(() => {
    updateGroceryList();
    }, []);
  
  const updateGroceryList = async () => {
      const groceries = await getCurrentGroceries();
      if (groceries.length > 0) {
        setGroceryList(groceries);
      } else {
        setEmpty(true);
      }
  }
  const handleDelete = async (id) => {
    await removeGrocery(id);
    updateGroceryList();
    }
  return (
    <div>
      <Title/>
      <SwipeableList className={classes.root}>
      {empty
      ? <h1 style={{textAlign: 'center', marginTop: '1rem'}} className={importedClasses.subTitle}>The list is empty<br/> Thank you Mom!</h1>
      : ((groceryList.length > 0)
        ? groceryList.map((grocery) => {
          return (
            <SwipeToDelete onSwipeRight={()=>handleDelete(grocery._id)}>
                <FoodCard key={grocery._id} foodInfo={grocery}/>
            </SwipeToDelete>
          )})
          : <Loading/>   
      )
      }
      
      </SwipeableList>
    </div>
  );
}

export default ListPage;