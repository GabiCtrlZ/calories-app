import React from 'react'
import { TextField, DialogContentText } from '@material-ui/core'
import forceNumber from '../../../lib/forceNumber'
import { connect } from 'react-redux'

function DialogTextField(props) {
  const { name, description, setter, value, allowString, isLight } = props

  const inputStyle = {
    WebkitBoxShadow: "0 0 0 1000px white inset",
    WebkitTextFillColor: isLight ? 'black' : 'white',
  }
  
  return (
    <div>
      <TextField
        inputProps={{ style: inputStyle }}
        margin="dense"
        id={name.toLowerCase()}
        label={name}
        type={allowString ? 'text' : 'number'}
        value={value}
        onChange={(e) => setter(allowString ? e.target.value : forceNumber(e.target.value))}
        fullWidth
      />
      <DialogContentText>
        {description}
      </DialogContentText>
    </div>
  )
}

const mapStateToProps = ({ general }) => ({
  isLight: general.isLight,
})

export default (connect(
  mapStateToProps,
)(DialogTextField))
