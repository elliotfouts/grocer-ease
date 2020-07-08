import React, {useState} from 'react';
import {Styles} from '../styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';
import {makeStyles} from '@material-ui/styles';
import { CategoryRounded } from '@material-ui/icons';

const useStyles = makeStyles({
  divider: {
    marginBottom: '0.5rem',
  },
  chip: {
    marginBottom: '0.5rem',
    marginRight: '0.5rem',
  }
})

const Title = (props) => {
  const importedClasses = Styles();
  const classes = useStyles();
  const categories = ['produce', 'dry snacks', 'dairy/eggs', 'beverages'];
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  const toggleFilters = () => setIsOpenFilters(!isOpenFilters);

  return (
    <div>
      <Grid container justify='space-between' alignItems='flex-end'>
        <h1 className={importedClasses.title}>Grocery List</h1>
        <p onClick={toggleFilters}>filter</p>
      </Grid>
      <Divider className={classes.divider}/>
      <Collapse in={isOpenFilters}>
        {
          categories.map((category, index) => <Chip className={classes.chip} label={category} key={index} variant="outlined"/>)
        }
        <Divider className={classes.divider}/>
      </Collapse>
    </div>
  );
}

export default Title;