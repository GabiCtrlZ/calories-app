import React, { useState } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  Grid,
  Link
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useHistory } from 'react-router-dom'

import { playErrorSnackbar } from '../../middleware/api'
import { register } from '../../actions'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Register(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const {
    onRegister,
    isLoggedIn,
    isLight,
  } = props
  const classes = useStyles()
  const { from } = props.location.state || { from: { pathname: '/' } }
  const inputStyle = {
    WebkitBoxShadow: "0 0 0 1000px rgb(239, 239, 245) inset",
    WebkitTextFillColor: isLight ? 'black' : 'white',
  }
  const history = useHistory()

  const handleSubmit = () => {
    if (passwordAgain === password) onRegister({ email, password })
    else playErrorSnackbar(`Password's must match`)
  }

  if (isLoggedIn) return <Redirect to={from} />
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <TextField
            inputProps={{ style: inputStyle }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <TextField
            inputProps={{ style: inputStyle }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <FormControl style={{ marginTop: 10 }} fullWidth variant="outlined" >
            <InputLabel htmlFor="outlined-adornment-password">Enter Password Again*</InputLabel>
            <OutlinedInput
              inputProps={{ style: inputStyle }}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={passwordAgain}
              fullWidth
              required
              label="Enter Password Again"
              onChange={(e) => { setPasswordAgain(e.target.value) }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => {
                      event.preventDefault()
                    }}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            fullWidth
            disabled={!(email && password && passwordAgain)}
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="center" >
            <Grid item>
              <Link role="button" onClick={() => history.push('/login')}>
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = ({ ui, general }) => ({
  isLoggedIn: ui.isLoggedIn,
  isLight: general.isLight,
})

const mapActionsToProps = dispatch => ({
  onRegister: bindActionCreators(register, dispatch),
})

export default (connect(
  mapStateToProps,
  mapActionsToProps,
)(Register))