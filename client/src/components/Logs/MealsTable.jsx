import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import DeleteIcon from '@material-ui/icons/Delete'

import { getMeals, removeMeal, setCalories } from '../../actions'


const useStyles = makeStyles(() => ({
  table: {
    backgroundColor: 'transparent',
  },
  deleteButton: {
    color: 'white',
    backgroundColor: 'rgba(190, 25, 75)',
    '&:hover': {
      backgroundColor: 'rgba(190, 25, 75)',
    },
  },
}))

const isDisabled = (date) => new Date(date).toDateString() !== new Date().toDateString()

const MealItem = ({
  item,
  logInstance,
  classes,
  deleteMeal,
}) =>
  (<TableRow key={item._id}>
    <TableCell component="th" scope="row">
      {item.name}
    </TableCell>
    <TableCell align="right">{Math.floor(item.fat * 9 + item.carbs * 4 + item.protein * 4)}</TableCell>
    <TableCell align="right">{Math.floor(item.fat)}</TableCell>
    <TableCell align="right">{Math.floor(item.carbs)}</TableCell>
    <TableCell align="right">{Math.floor(item.protein)}</TableCell>
    <TableCell align="right">
      <Button
        variant="contained"
        color="secondary"
        onClick={() => deleteMeal(item)}
        className={isDisabled(logInstance.date) ? '' : classes.deleteButton}
        disabled={isDisabled(logInstance.date)}
      >
        <DeleteIcon />
      </Button>
    </TableCell>
  </TableRow>)

function MealsTable(props) {
  const {
    meals,
    match,
    handleGetMeals,
    handleSetCalories,
    handleRemoveMeal,
    calories,
    logs,
  } = props
  const { id } = match.params
  const [logInstance, setLogInstance] = useState({})
  const classes = useStyles()

  useEffect(() => {
    handleGetMeals(id)
    setLogInstance(logs.find(e => e._id === id))
  }, [id])

  const deleteMeal = (item) => {
    const {
      _id,
      protein,
      carbs,
      fat
    } = item
    handleRemoveMeal(_id)
    handleSetCalories({
      protein: Math.max(calories.protein - protein, 0),
      carbs: Math.max(calories.carbs - carbs, 0),
      fat: Math.max(calories.fat - fat, 0),
    })
  }

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map(e => <MealItem key={e._id} item={e} classes={classes} logInstance={logInstance} deleteMeal={deleteMeal} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const mapStateToProps = ({ meals, logs, calories }) => ({
  meals,
  logs,
  calories,
})

const mapActionsToProps = dispatch => ({
  handleGetMeals: bindActionCreators(getMeals, dispatch),
  handleSetCalories: bindActionCreators(setCalories, dispatch),
  handleRemoveMeal: bindActionCreators(removeMeal, dispatch),
})

export default (connect(
  mapStateToProps,
  mapActionsToProps,
)(MealsTable))