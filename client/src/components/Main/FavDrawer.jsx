import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListIcon from '@material-ui/icons/List'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import ListItemText from '@material-ui/core/ListItemText'
import { IconButton, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Button } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { removeFav } from '../../actions'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  buttonIcon: {
    color: 'white',
    marginLeft: '3vw',
  },
  details: {
    flexDirection: 'column',
  },
  customButtonColor: {
    color: 'white',
    backgroundColor: 'rgba(70, 25, 150)',
    '&:hover': {
      backgroundColor: 'rgba(70, 25, 150)',
    },
  },
})

function DrawerItem(props) {
  const {
    expanded,
    item,
    handleChange,
    classes,
    toggleDialog,
    setAddDialogInitialValue,
    handleRemoveFav,
  } = props
  const { name, protein, carbs, fat, _id } = item

  const openDialog = () => {
    setAddDialogInitialValue({ protein, fat, carbs })
    toggleDialog()
  }

  return (
    <ExpansionPanel square expanded={expanded === name} onChange={handleChange(name)}>
      <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>{name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details} >
        <Typography>
          {`Carbs: ${carbs} (g)`}
        </Typography>
        <Typography>
          {`Protein: ${protein} (g)`}
        </Typography>
        <Typography>
          {`Fat: ${fat} (g)`}
        </Typography>
        <br />
        <Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className={classes.customButtonColor}
            onClick={openDialog}
          >
            Add
          </Button>
        </Typography>
        <br />
        <Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => handleRemoveFav({ _id })}
          >
            Delete
          </Button>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

function FavDrawer(props) {
  const { toggleDialog, toggleFav, fav, setAddDialogInitialValue, handleRemoveFav } = props
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState('panel1')
  const [state, setState] = React.useState({
    left: false,
  })

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <List>
        {fav.map((item) => (
          <DrawerItem
            key={item._id}
            expanded={expanded}
            item={item}
            handleChange={handleChange}
            classes={classes}
            toggleDialog={toggleDialog}
            setAddDialogInitialValue={setAddDialogInitialValue}
            handleRemoveFav={handleRemoveFav}
          />
        ))}
      </List>
      <List>
        <ListItem button onClick={toggleFav} >
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary="Add" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {['left', 'right'].map((anchor, i) => (
        <React.Fragment key={anchor}>
          {i === 0 && (
            <IconButton onClick={toggleDrawer(anchor, true)} className={classes.buttonIcon} >
              <ListIcon fontSize="large" />
            </IconButton>
          )}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

const mapStateToProps = ({ fav }) => ({
  fav,
})

const mapActionsToProps = dispatch => ({
  handleRemoveFav: bindActionCreators(removeFav, dispatch),
})

export default (connect(
  mapStateToProps,
  mapActionsToProps,
)(FavDrawer))