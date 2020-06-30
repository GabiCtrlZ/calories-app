import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addFav } from '../../../actions'
import DialogTextField from './DialogTextField'


function AddDialog(props) {
  const { open, handleClose, handleAddFav } = props
  const [protein, setProtein] = useState('')
  const [fat, setFat] = useState('')
  const [carbs, setCarbs] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    setFat('')
    setProtein('')
    setCarbs('')
    setName('')
  }, [open])

  const addFav = () => {
    handleAddFav({
      name: name || 'No Name',
      protein: protein || 0,
      carbs: carbs || 0,
      fat: fat || 0,
    })
    handleClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add macros</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you are able to add a specific food for later use. enter the data for 100 (g) and (preferably) a unique name
          </DialogContentText>
          {/* NAME */}
          <DialogTextField name="Name" description="Product name" setter={setName} value={name} allowString="true" />
          {/* CARBS */}
          <DialogTextField name="Carbs" description="Carbs for 100 (g)" setter={setCarbs} value={carbs} />
          {/* PROTEIN */}
          <DialogTextField name="Protein" description="Protein for 100 (g)" setter={setProtein} value={protein} />
          {/* FAT */}
          <DialogTextField name="Fat" description="Fat for 100 (g)" setter={setFat} value={fat} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addFav} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapActionsToProps = dispatch => ({
  handleAddFav: bindActionCreators(addFav, dispatch),
})

export default (connect(
  null,
  mapActionsToProps,
)(AddDialog))