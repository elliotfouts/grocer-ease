import React from 'react';
import { ActionAnimations, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import TrashIcon from '@material-ui/icons/Delete';
import {makeStyles} from '@material-ui/styles';


export const SwipeToDelete = (props) => {
  const {children, onSwipeRight} = props;
  return (
  <SwipeableListItem
    style={{backgroundColor: 'red'}}
    swipeRight={{
      content: <div style={{color: 'red'}}><TrashIcon/></div>,
      action: onSwipeRight,
      actionAnimation: ActionAnimations.REMOVE,
    }}
  >
    {children}
  </SwipeableListItem>
  )
}