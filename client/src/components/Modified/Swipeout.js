import React from 'react';
import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import TrashIcon from '@material-ui/icons/Delete';
import {makeStyles} from '@material-ui/styles';


export const SwipeToDelete = (props) => {
  const {children, onSwipeRight} = props;
  return (
  <SwipeableListItem
    style={{backgroundColor: 'transparent'}}
    swipeRight={{
      content: <div style={{color: 'red'}}><TrashIcon/></div>,
      action: onSwipeRight,
    }}
    onSwipeProgress={progress => console.info(`Swipe progress: ${progress}%`)}
  >
    {children}
  </SwipeableListItem>
  )
}