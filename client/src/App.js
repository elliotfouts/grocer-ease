import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import AddPage from './components/AddPage';
import SearchPage from './components/SearchPage';
import ListPage from './components/ListPage';


function App() {
  return (
    <Router>
      <Navbar>
        <Switch>
          <Route exact path='/login'>
            <LoginPage/>
          </Route>
          <Route exact path='/groceries/search'>
            <SearchPage/>
          </Route>
          <Route exact path='/groceries/:id'>
            <AddPage/>
          </Route>
          <Route exact path='/groceries'>
            <ListPage/>
          </Route>
        </Switch>
      </Navbar>
    </Router>
  );
}

export default App;
