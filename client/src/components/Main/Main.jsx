import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import ReplayIcon from '@material-ui/icons/Replay'
import BallotIcon from '@material-ui/icons/Ballot'
import { useHistory } from 'react-router-dom'

import CaloriesContainer from './CaloriesContainer'
import TotalCalories from './TotalCalories'
import FavDrawer from './FavDrawer'
import AddDialog from './Dialogs/AddDialog'
import AddFav from './Dialogs/AddFav'
import { setCalories, addLog } from '../../actions'
import { bindActionCreators } from 'redux'

const useStyles = makeStyles((theme) => ({
  topContainer: {
    height: '30vh',
    background: 'linear-gradient(to right, rgba(50, 36, 180), rgba(94, 21, 154))',
  },
  bottomContainer: {
    height: '62vh',
    display: 'flex',
    flexWrap: 'wrap',
  },
  customButtonColor: {
    position: 'absolute',
    bottom: '0',
    margin: '10%',
    color: 'white',
    backgroundColor: 'rgba(190, 25, 75)',
    '&:hover': {
      backgroundColor: 'rgba(190, 25, 75)',
    },
  },
  customLogsColor: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    margin: '10.4%',
    color: 'white',
    backgroundColor: 'rgba(190, 25, 75)',
    '&:hover': {
      backgroundColor: 'rgba(190, 25, 75)',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

function Main(props) {
  const { handleSetCalories, handleAddLog } = props
  const [open, setOpen] = useState(false)
  const [openFav, setOpenFav] = useState(false)
  const [addDialogInitialValue, setAddDialogInitialValue] = useState({})
  const classes = useStyles()

  const history = useHistory()

  const toggleDialog = () => setOpen(!open)
  const toggleFav = () => setOpenFav(!openFav)
  const resetAddInitialValue = () => setAddDialogInitialValue({})
  const resetCalories = () => {
    handleSetCalories({
      protein: 0,
      carbs: 0,
      fat: 0,
    })
    handleAddLog()
  }

  return (
    <div>
      {/* TOP CONTAINER */}
      <div className={classes.topContainer} >
        <FavDrawer toggleDialog={toggleDialog} toggleFav={toggleFav} setAddDialogInitialValue={setAddDialogInitialValue} />
        <TotalCalories />
      </div>
      {/* BOTTOM CONTAINER */}
      <div className={classes.bottomContainer}>
        <CaloriesContainer toggleDialog={toggleDialog} resetAddInitialValue={resetAddInitialValue} />
        <Fab color="primary" aria-label="add" className={classes.customButtonColor} onClick={resetCalories} >
          <ReplayIcon />
        </Fab>
        <Fab color="primary" aria-label="add" variant="extended" className={classes.customLogsColor} onClick={() => history.push('/logs')} >
          <BallotIcon className={classes.extendedIcon} />
          Logs
        </Fab>
      </div>
      <AddDialog open={open} handleClose={toggleDialog} initialValue={addDialogInitialValue} />
      <AddFav open={openFav} handleClose={toggleFav} />
    </div>
  )
}

const mapActionsToProps = dispatch => ({
  handleSetCalories: bindActionCreators(setCalories, dispatch),
  handleAddLog: bindActionCreators(addLog, dispatch),
})

export default (connect(
  null,
  mapActionsToProps,
)(Main))