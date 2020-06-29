import React, { useEffect, Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { setRef } from '../lib/snackbar'
import PrivateRoute from './PrivateRoute'
import { bindActionCreators } from 'redux'

import { getUserData } from '../actions'
import LegoLoading from '../components/Loading/LegoLoading'
import Main from './Main/Main'
import Header from './Header'
import Logs from './Logs/Logs'
import Log from './Logs/Log'
const Login = lazy(() => import('./Login/Login'))

function AppRouter(props) {

  useEffect(() => {
    if (!props.isLoggedIn) {
      props.getUserData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const { isLoggedIn, isLoading } = props

  setRef(props.enqueueSnackbar, props.closeSnackbar)

  return (
    <Router>
      <Suspense fallback={<LegoLoading open={true} />}>
        <Header />
        <Route exact path='/' render={() => (isLoggedIn ? <Redirect to={`/main`} /> : <Redirect to={`/login`} />)} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute path='/main' isLoggedIn={isLoggedIn} component={Main} />
        <PrivateRoute exact path='/logs' isLoggedIn={isLoggedIn} component={Logs} />
        <PrivateRoute path='/logs/:id' isLoggedIn={isLoggedIn} component={Log} />
        <LegoLoading open={isLoading} />
      </Suspense>
    </Router>
  )
}

const mapStateToProps = ({ ui, general }) => ({
  isLoggedIn: ui.isLoggedIn,
  isLoading: general.isLoading,
})

const mapActionsToProps = dispatch => ({
  getUserData: bindActionCreators(getUserData, dispatch),
})

export default (connect(
  mapStateToProps,
  mapActionsToProps,
)(withSnackbar(AppRouter)))