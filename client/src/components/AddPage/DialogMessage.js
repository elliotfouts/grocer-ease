import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {Styles} from '../styles';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gtidGap: '1rem',
    '& img': {
      maxHeight: '100px',
      maxWidth: '100px',
    }
  }
})

const DialogSuggested = (props) => {
  const {onClose, classes, suggestedGroceries, suggestedImages, setImageUrl} = props;
  const importedStyles = Styles();
  const localClasses = useStyles();

  return (
    <div>
      <DialogTitle id="alert-dialog-title">{(suggestedGroceries)?"Is this what you're looking for?":"Please choose a picture?"}</DialogTitle>
      <DialogContent>
        { (suggestedGroceries)
        && suggestedGroceries.map(suggestion => {
          return (
            <a className={importedStyles.link} href={`/groceries/${suggestion._id}?iscurrent=${suggestion.iscurrent}&source=addpage`}>
              <DialogContentText id="alert-dialog-description"> {suggestion.brand} {suggestion.name}</DialogContentText>
            </a>
          )}
        )}
        {(suggestedImages)
        && <div className={localClasses.grid}>{suggestedImages.map(suggestion => {
            return (
              <img src={suggestion.url} onClick={()=>setImageUrl(suggestion.url)}></img>
            )})}
          </div>
        }
      </DialogContent>
      <DialogActions>
        {(suggestedGroceries) 
          ? <Button className={classes.dialogueButton} onClick={onClose}>
              No it's not
            </Button>
          : <Button className={classes.dialogueButton} onClick={onClose}>
              No Picture
            </Button>
        }
      </DialogActions>
    </div>
  );
}

export default DialogSuggested;