import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn'
import { useHistory } from 'react-router-dom'
import Bounce from 'react-reveal/Bounce'

import MealsTable from './MealsTable'


const useStyles = makeStyles((theme) => ({
  customBackColor: {
    position: 'fixed',
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

function Log(props) {
  const { match } = props
  const classes = useStyles()

  const history = useHistory()

  return (
    <div>
      <Bounce left>
        <MealsTable match={match} />
      </Bounce>
      {/* FOOTER BUTTON */}
      <Fab color="primary" aria-label="add" variant="extended" className={classes.customBackColor} onClick={() => history.push('/logs')} >
        <AssignmentReturnIcon className={classes.extendedIcon} />
          Back
      </Fab>
    </div>
  )
}

const mapActionsToProps = dispatch => ({
})

export default (connect(
  null,
  mapActionsToProps,
)(Log))