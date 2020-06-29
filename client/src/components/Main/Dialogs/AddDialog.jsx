import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setCalories, addMeal } from '../../../actions'
import DialogTextField from './DialogTextField'


function AddDialog(props) {
  const { open, handleClose, initialValue, calories, handleSetCalories, handleAddMeal } = props
  const [protein, setProtein] = useState('')
  const [fat, setFat] = useState('')
  const [carbs, setCarbs] = useState('')
  const [weight, setWeight] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    setFat(initialValue.fat || '')
    setProtein(initialValue.protein || '')
    setCarbs(initialValue.carbs || '')
    setName(initialValue.name || '')
    setWeight('')
  }, [open])

  const addCalories = () => {
    handleSetCalories({
      protein: (protein * (weight / 100)) + calories.protein,
      carbs: (carbs * (weight / 100)) + calories.carbs,
      fat: (fat * (weight / 100)) + calories.fat,
    })
    handleAddMeal({
      protein: (protein * (weight / 100)),
      carbs: (carbs * (weight / 100)),
      fat: (fat * (weight / 100)),
      name: name || 'No name',
    })
    handleClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add macros</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you are able to add your current meal calorie intake. simply enter the values for a 100 (g) and then enter the weight you ate
          </DialogContentText>
          {/* NAME */}
          <DialogTextField name="Name" description="Meal Name" setter={setName} value={name} allowString="true" />
          {/* CARBS */}
          <DialogTextField name="Carbs" description="Carbs for 100 (g)" setter={setCarbs} value={carbs} />
          {/* PROTEIN */}
          <DialogTextField name="Protein" description="Protein for 100 (g)" setter={setProtein} value={protein} />
          {/* FAT */}
          <DialogTextField name="Fat" description="Fat for 100 (g)" setter={setFat} value={fat} />
          {/* WEIGHT */}
          <DialogTextField name="Weight" description="Total weight in grams" setter={setWeight} value={weight} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addCalories} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}


const mapStateToProps = ({ calories }) => ({
  calories,
})

const mapActionsToProps = dispatch => ({
  handleSetCalories: bindActionCreators(setCalories, dispatch),
  handleAddMeal: bindActionCreators(addMeal, dispatch),
})

export default (connect(
  mapStateToProps,
  mapActionsToProps,
)(AddDialog))