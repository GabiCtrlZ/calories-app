import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core'
import { getMeals } from '../../actions'
import { bindActionCreators } from 'redux'


const useStyles = makeStyles((theme) => ({
  table: {
    backgroundColor: 'transparent',
  },
}))

const MealItem = ({
  item,
}) =>
  (<TableRow key={item._id}>
    <TableCell component="th" scope="row">
      {item.name}
    </TableCell>
    <TableCell align="right">{Math.floor(item.fat * 9 + item.carbs * 4 + item.protein * 4)}</TableCell>
    <TableCell align="right">{Math.floor(item.fat)}</TableCell>
    <TableCell align="right">{Math.floor(item.carbs)}</TableCell>
    <TableCell align="right">{Math.floor(item.protein)}</TableCell>
  </TableRow>)

function MealsTable(props) {
  const { meals, match, handleGetMeals } = props
  const { id } = match.params
  const classes = useStyles()

  useEffect(() => {
    handleGetMeals(id)
  }, [id])

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
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map(e => <MealItem key={e._id} item={e} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const mapStateToProps = ({ meals }) => ({
  meals
})

const mapActionsToProps = dispatch => ({
  handleGetMeals: bindActionCreators(getMeals, dispatch),
})

export default (connect(
  mapStateToProps,
  mapActionsToProps,
)(MealsTable))