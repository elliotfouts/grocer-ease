import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/List';
import CartIcon from '@material-ui/icons/ShoppingCart';
import {makeStyles} from '@material-ui/styles';
import {Styles} from '../styles';

const useStyles = makeStyles({
  root: {
    padding: '1rem',
    color: '#00000'
  },
  title: {
    padding: 0,
    margin: 0,
    fontWeight: '500',
  }
})

const Navbar = () => {
  const classes = useStyles();
  const importedClasses = Styles();
	return (
		<Grid className={classes.root} container justify='space-between' alignItems='center'>
      <a  className={importedClasses.link} href='/groceries'><h1 className={classes.title}>Grocer-ease</h1></a>
      <div>
        <a href='/groceries/search'>
        <IconButton aria-label="add">
          <SearchIcon />
        </IconButton>
        </a>
        <a href='/groceries'>
        <IconButton aria-label="list">
          <CartIcon />
        </IconButton>
        </a>
      </div>
		</Grid>
	);
};

export default Navbar;