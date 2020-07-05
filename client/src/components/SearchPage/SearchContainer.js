import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from '@material-ui/styles';
import {InputOutlined } from '../Modified/Input';
import FoodCard from './FoodCard';
import {getGroceries} from '../../utils/API'
import {Styles} from '../styles';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', 
    gridGap: '1rem',
  },
  searchResultsTerm: {
    fontSize: '1rem',
    color: '#07031A50',
    marginBottom: '1rem',
    fontWeight: '400',
    '& span': {
      color: '#07031A',
    }
  }
});

const SearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groceries, setGroceries] = useState([]);
  const [searchedGroceries, setSearchedGroceries] = useState([]);
  const classes = useStyles();
  const importedClasses = Styles();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  } 

  useEffect(()=> {
    (async()=>{
      let groceryList = await getGroceries();
      setGroceries(groceryList);
      setSearchedGroceries(groceryList);
    })();
  }, []);

  useEffect(()=>{
    const filteredResults = groceries.filter(grocery => {
      const groceryName = `${grocery.brand && grocery.brand.toLowerCase()} ${grocery.name.toLowerCase()}`;
      return groceryName.includes(searchTerm.toLowerCase())
    });
    setSearchedGroceries(filteredResults);
  }, [searchTerm]);

  
  return (
    <div>
      <InputOutlined value={searchTerm} onChange={handleInputChange} placeholder={'search for a food...'} icon={<SearchIcon/>}/>

      <h2 className={classes.searchResultsTerm}> 
        {
          (searchTerm)
          ? (`Showing results for ${searchTerm}`)
          :'Popular Items'
        }
      </h2>

      <div className={classes.grid}>
      { 
        (searchedGroceries.length > 0)
        ? searchedGroceries.map((grocery) => {
          return (
            <a className={importedClasses.link} href={`/groceries/${grocery._id}`}>
              <FoodCard brand={grocery.brand} name={grocery.name} imageUrl={grocery.imageUrl}/>
            </a>
          );
        })
        : <h2>display popular groceries</h2>
      }
      </div>
    
  </div>
  );
}

export default SearchContainer;
