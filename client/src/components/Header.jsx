import React from 'react'
import { connect } from 'react-redux'
import { IconButton, AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { bindActionCreators } from 'redux'

import { failedLogin2 as logout } from '../actions'
import Toggle from './Toggle'

const useStyles = makeStyles(() => ({
  root: {
    background: 'linear-gradient(to right, rgba(50, 36, 180), rgba(94, 21, 154))'
  },
  toolbar: {
    padding: '0 5px 0 0',
  },
  toggle: {
    flexGrow: 1,
  },
  logoutIcon: {
    color: 'white',
  }
}))

function Main(props) {
  const { userLogout, isLoggedIn } = props
  const classes = useStyles()

  return (
    <div>
      <AppBar position="static" className={classes.root} >
        <Toolbar className={classes.toolbar} >
          <div className={classes.toggle} >
            <Toggle />
          </div>
          {isLoggedIn && <IconButton onClick={userLogout} className={classes.logoutIcon} ><ExitToAppIcon /></IconButton>}
        </Toolbar>
      </AppBar>
    </div>
  )
}


const mapStateToProps = ({ ui }) => ({
  isLoggedIn: ui.isLoggedIn,
})

const mapActionsToProps = dispatch => ({
  userLogout: bindActionCreators(logout, dispatch),
})

export default (connect(
  mapStateToProps,
  mapActionsToProps,
)(Main))