import React, { useEffect, useState, Suspense, lazy } from 'react'
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
import Incompatible from './NotFound/Incompatible'
import Register from './Register/Register'

const Login = lazy(() => import('./Login/Login'))

function AppRouter(props) {
  // const calcWindowCompatibility = () => window.innerHeight < 636 || window.innerWidth > window.innerHeight
  const calcWindowCompatibility = () => false
  const [isWindowIncompatible, setisWindowIncompatible] = useState(calcWindowCompatibility())
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  useEffect(() => {
    function handleResize() {
      setisWindowIncompatible(calcWindowCompatibility())
      setWindowHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    if (!props.isLoggedIn) {
      props.getUserData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const { isLoggedIn, isLoading } = props

  setRef(props.enqueueSnackbar, props.closeSnackbar)

  return (
    <Router>
      {isWindowIncompatible && (<Incompatible windowHeight={windowHeight} />)}
      {!isWindowIncompatible && (<Suspense fallback={<LegoLoading open={true} />}>
        <Header />
        <Route exact path='/' render={() => (isLoggedIn ? <Redirect to={`/main`} /> : <Redirect to={`/login`} />)} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute path='/main' isLoggedIn={isLoggedIn} component={Main} />
        <PrivateRoute exact path='/logs' isLoggedIn={isLoggedIn} component={Logs} />
        <PrivateRoute path='/logs/:id' isLoggedIn={isLoggedIn} component={Log} />
        <LegoLoading open={isLoading} />
      </Suspense>)}
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