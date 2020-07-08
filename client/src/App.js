import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import AddPage from './components/AddPage';
import SearchPage from './components/SearchPage';
import ListPage from './components/ListPage';
import Loading from './components/Loading'


function App() {
  return (
    <Router>
      <Navbar>
        <Switch>
          <Route exact path='/groceries/search'>
            <SearchPage/>
          </Route>
          <Route exact path='/groceries/:id/'>
            <AddPage/>
          </Route>
          <Route exact path='/groceries'>
            <ListPage/>
          </Route>
          <Route exact path='/groceries'>
            <ListPage/>
          </Route>
          <Route exact path='/*'>
            <LoginPage/>
          </Route>
        </Switch>
      </Navbar>
    </Router>
  );
}

export default App;
