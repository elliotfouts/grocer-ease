import React from 'react';
import WelcomeText from './WelcomeText';
import SearchIcon from '@material-ui/icons/Search';
import {InputOutlined } from '../Modified/Input';
import SearchContainer from './SearchContainer';
import {ButtonFloatingAction} from '../Modified/Button'

const SearchPage = () => {
  return (
    <div>
      <WelcomeText name={'Elliot'}/>
      <SearchContainer/>
      <ButtonFloatingAction/>
    </div>
  );
}

export default SearchPage;