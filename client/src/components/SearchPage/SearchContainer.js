import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from '@material-ui/styles';
import {InputOutlined } from '../Modified/Input';
import FoodCard from './FoodCard';
import {getGroceries} from '../../utils/API'
import {Styles} from '../styles';
import Loading from '../Loading'

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
  const [empty, setEmpty] = useState(false);

  const classes = useStyles();
  const importedClasses = Styles();

  const handleInputChange = (event) => {
    setEmpty(false);
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
    if (searchTerm !== '') {
      const filteredResults = groceries.filter(grocery => {
        const groceryName = `${grocery.brand && grocery.brand.toLowerCase()} ${grocery.name.toLowerCase()}`;
        return groceryName.includes(searchTerm.toLowerCase())
      });

      if (filteredResults.length === 0) {
        console.log('no search results');
        setEmpty(true);
      }
      setSearchedGroceries(filteredResults);
      }
    }, [searchTerm]);

  
  return (
    <div>
      <InputOutlined value={searchTerm} onChange={handleInputChange} placeholder={'search for a food...'} icon={<SearchIcon/>}/>

      <h2 className={classes.searchResultsTerm}> 
        {(searchTerm) 
          ? (empty) 
            ? ''
            : `Showing results for ${searchTerm}`
          :'Popular Items'}
      </h2>

      
      { 
        (searchedGroceries.length > 0)
        ? <div className={classes.grid}>
            {searchedGroceries.map((grocery) => {
              return (
                <a className={importedClasses.link} href={`/groceries/${grocery._id}?iscurrent=${grocery.isCurrent}&source=searchpage`}>
                  <FoodCard brand={grocery.brand} name={grocery.name} imageUrl={grocery.imageUrl}/>
                </a>
              );
            })} 
          </div>
        : (empty) 
          ? <div>
            <h1 className={importedClasses.title} style={{textAlign: 'center'}}>
            <br/>
            <i class="fas fa-sad-tear"></i> 
            <br/>
            No results found 
            <br/>
            Add your own!
            </h1>
          </div>
          : <Loading/>
      }
    
  </div>
  );
}

export default SearchContainer;
