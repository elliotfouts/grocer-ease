import React from 'react';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    marginBottom: '2rem',
    '& div': {
      padding: '0rem',
    },
    '& div:focus': {
      backgroundColor: 'transparent',
    },
    '& fieldset': {
      display: 'none',
    }
  }
})

const Category = (props) => {
  const {category, onChange} = props;
  const categories = ['produce', 'dry snacks', 'meat', 'dairy/eggs', 'baking/spices', 'beverages', 'personal care', 'household/clearning', 'other'];
  const classes = useStyles();

  return (
    <Select className={classes.root} variant='outlined' onChange={onChange} autoWidth={true} value={category || 'category'} defaultValue={category || 'category'}>
      {<option selected disabled value={'category'} key={-1}>{'category'}</option>}
      {categories.map((categoryName, index) => <option value={categoryName} key={index}>{categoryName}</option>)}
    </Select>
  )
}

export default Category;